
const express = require("express");
const bodyParser = require("body-parser");
const { SessionsClient } = require("@google-cloud/dialogflow-cx");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(bodyParser.json());

const projectId = "centering-brook-459514-u2";
const location = "us-central1";
const agentId = "59b93f09-4da6-487e-81cb-50b8fe4f6a32";

const client = new SessionsClient();

app.post("/webhook", async (req, res) => {
  const sessionId = uuidv4();
  const sessionPath = client.projectLocationAgentSessionPath(
    projectId,
    location,
    agentId,
    sessionId
  );

  const query = req.body.SpeechResult || "Hello";

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: query,
      },
      languageCode: "en",
    },
  };

  try {
    const [response] = await client.detectIntent(request);
    const fulfillmentText = response.queryResult.responseMessages
      .map(msg => msg.text?.text)
      .join(" ");

    res.set("Content-Type", "text/xml");
    res.send(`
      <Response>
        <Say>${fulfillmentText}</Say>
      </Response>
    `);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error processing the request");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
