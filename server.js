const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.raw({ type: 'audio/wav', limit: '10mb' }));

app.get('/', (req, res) => {
  res.send('✅ Server is live');
});

app.post('/passthru', (req, res) => {
  console.log('📞 Received Exotel passthru');

  const xml = `
    <Response>
      <Say>Welcome to Anubhalaya. This is a test response.</Say>
    </Response>
  `;

  res.set('Content-Type', 'text/xml');
  res.send(xml);
});

app.listen(port, () => {
  console.log(`✅ Listening on port ${port}`);
});
