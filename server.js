const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

// To handle passthru XML and audio
app.use(bodyParser.raw({ type: 'audio/wav', limit: '10mb' }));

// For browser test
app.get('/', (req, res) => {
  res.send('✅ Dialogflow Webhook on Render is live');
});

// Handle Exotel passthru POST
app.post('/passthru', async (req, res) => {
  console.log('📞 Passthru request received from Exotel');

  // Respond with valid TwiML to keep the call alive
  const xmlResponse = `
    <Response>
      <Say voice="female">Please wait while we connect you to the assistant.</Say>
      <Pause length="10" />
      <Say>Goodbye</Say>
    </Response>
  `;

  res.set('Content-Type', 'text/xml');
  res.send(xmlResponse);
});

app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
