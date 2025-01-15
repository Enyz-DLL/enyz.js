# Voice System

## Voice Structure

```javascript
const { Voice } = require('enyz.js');

const voice = new Voice({
    guild: message.guild,
    client: client,
    selfDeaf: true,
    selfMute: false
});
```

## Methods

### Connecting
```javascript
// Connect to a voice channel
await voice.connect(channel);
```

### Disconnecting
```javascript
// Disconnect from voice channel
voice.disconnect();
```

### State Management
```javascript
// Set deafen state
voice.setDeaf(true);

// Set mute state
voice.setMute(true);
```

### Status Checks
```javascript
// Check if connected
const isConnected = voice.isConnected();

// Check if speaking
const isSpeaking = voice.isSpeaking();

// Get current channel
const channel = voice.getChannel();
```

## Events

```javascript
voice.on('disconnect', () => {
    // Handle disconnection
});

voice.on('error', (error) => {
    // Handle errors
});

voice.on('stateChange', (oldState, newState) => {
    // Handle state changes
});
``` 