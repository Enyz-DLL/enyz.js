const mongoose = require('mongoose');
const sqlite3 = require('sqlite3');
const mysql = require('mysql2/promise');

class DatabaseManager {
    constructor(options) {
        this.type = options.type;
        this.connection = null;
        this.options = options;
    }

    async connect() {
        switch(this.type) {
            case 'mongodb':
                await this.connectMongoDB();
                break;
            case 'sqlite':
                await this.connectSQLite();
                break;
            case 'mysql':
                await this.connectMySQL();
                break;
            default:
                throw new Error('Unsupported database type');
        }
    }

    async connectMongoDB() {
        try {
            this.connection = await mongoose.connect(this.options.url, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            console.log('Connected to MongoDB');
        } catch (error) {
            throw new Error(`MongoDB connection error: ${error.message}`);
        }
    }

    async connectSQLite() {
        return new Promise((resolve, reject) => {
            this.connection = new sqlite3.Database(this.options.path, (err) => {
                if (err) reject(err);
                console.log('Connected to SQLite');
                resolve();
            });
        });
    }

    async connectMySQL() {
        try {
            this.connection = await mysql.createConnection(this.options);
            console.log('Connected to MySQL');
        } catch (error) {
            throw new Error(`MySQL connection error: ${error.message}`);
        }
    }
}

module.exports = DatabaseManager; 