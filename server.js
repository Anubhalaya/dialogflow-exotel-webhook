const express = require('express');
const bodyParser = require('body-parser');
const { SessionsClient } = require('@google-cloud/dialogflow-cx');
const WebSocket = require('ws');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/voice', (req, res) => {
  const twiml = `<?xml version="1.0" encoding="UTF-8"?>
  <Response>
    <Say>Connecting you to our assistant now.</Say>
    <Connect>
      <Stream url="wss://${req.headers.host}/media" />
    </Connect>
  </Response>`;

  res.set('Content-Type', 'text/xml');
  res.send(twiml);
});

const wss = new WebSocket.Server({ noServer: true });

wss.on('connection', (ws) => {
  console.log('🔊 WebSocket connection received from Twilio');

  ws.on('message', async (message) => {
    const msg = JSON.parse(message);
    if (msg.event === 'start') console.log('▶️ Media stream started');
    if (msg.event === 'media') {
      // You would stream this audio to Dialogflow CX in a real implementation
    }
    if (msg.event === 'stop') {
      console.log('⏹️ Media stream stopped');
    }
  });
});

const server = app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});

server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});