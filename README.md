# Twilio to Dialogflow CX Webhook

This Node.js app receives voice calls from Twilio, streams them via WebSocket, and sends audio to Dialogflow CX in real time.

## Setup

1. Create a `.env` file with your Dialogflow CX credentials.
2. Deploy on Render / Cloud Run.
3. Point Twilio Voice Webhook to `/voice` endpoint.

## Incoming Call Flow

- Twilio calls your number
- You respond with <Connect><Stream>
- Twilio sends media via WebSocket to /media
- You stream it to Dialogflow CX and respond