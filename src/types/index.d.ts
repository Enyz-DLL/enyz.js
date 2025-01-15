declare module 'enyz.js' {
    export class EnyzClient {
        constructor(options?: ClientOptions);
        public commands: Map<string, Command>;
        public events: Map<string, Event>;
        public client: any;
        public options: ClientOptions;
        
        public login(token: string): Promise<void>;
        public registerCommand(command: Command): this;
        public registerEvent(event: Event): this;
    }

    export interface ClientOptions {
        library?: 'discord.js' | 'eris';
        prefix?: string;
        intents?: string[] | number[];
        token?: string;
        database?: DatabaseOptions;
    }

    export interface DatabaseOptions {
        type: 'mongodb' | 'sqlite' | 'mysql';
        url?: string;
        path?: string;
    }

    export interface CommandOptions {
        name: string;
        description?: string;
        aliases?: string[];
        usage?: string;
        category?: string;
        permissions?: string[];
        cooldown?: number;
        execute: (message: any, args: string[]) => Promise<void> | void;
    }

    export class Command {
        constructor(options: CommandOptions);
        public name: string;
        public description: string;
        public aliases: string[];
        public usage: string;
        public category: string;
        public permissions: string[];
        public execute: (message: any, args: string[]) => Promise<void> | void;
    }

    export interface EventOptions {
        name: string;
        once?: boolean;
        execute: (...args: any[]) => Promise<void> | void;
    }

    export class Event {
        constructor(options: EventOptions);
        public name: string;
        public once: boolean;
        public execute: (...args: any[]) => Promise<void> | void;
    }

    export interface VoiceOptions {
        guild: any;
        client: any;
        deaf?: boolean;
        mute?: boolean;
        selfDeaf?: boolean;
        selfMute?: boolean;
        timeout?: number;
    }

    export class Voice {
        constructor(options: VoiceOptions);
        public channel: any;
        public connection: any;
        public player: any;
        public guild: any;
        public client: any;
        public speaking: boolean;
        public deaf: boolean;
        public mute: boolean;

        public connect(channel: any): Promise<any>;
        public disconnect(): void;
        public cleanup(): void;
        public setDeaf(deaf: boolean): this;
        public setMute(mute: boolean): this;
        public isConnected(): boolean;
        public isSpeaking(): boolean;
        public getChannel(): any;
    }
} 