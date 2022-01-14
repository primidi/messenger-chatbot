const express = require("express");
const app = express();
const port = 3000;

const bodyParser = require("body-parser");

app.use(bodyParser.json());

// Webhook's POST request endpoint
app.post("/webhook", (req, res) => {
  let body = req.body;

  // Checks this is an event from a page subscription
  if (body.object === "page") {
    body.entry.forEach((entry) => {
      let webhook_event = entry.messaging[0];
      console.log(webhook_event);
    });
    res.status(200).send("EVENT_RECEIVED");
  } else {
    res.sendStatus(404);
  }
});

// Webhook's GET request endpoint
app.get("/webhook", (req, res) => {
  // Verify token
  let VERIFY_TOKEN = "khw1999gph2001";

  // Parse the query params
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  // Checks the toke and mode is in the query string of the request
  if (mode && token) {
    // Checks the mode and token is valid
    if (mode === "subscribe" && token == VERIFY_TOKEN) {
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      // If invalid send 403 (forbidden)
      res.sendStatus(403);
    }
  }
});

app.listen(port, () => {
  console.log(`Messanger chatbot is listening at http://localhost:${port}`);
});
