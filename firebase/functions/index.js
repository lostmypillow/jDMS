const { onRequest } = require("firebase-functions/v2/https");
const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const https = require("https");
const TOKEN =
  "sPG4KE13zYqCaelVJCXHqOpB1jt+N49pmFgpukjxT6E/Wg5V/1+goJ+dHUiu8r0molbYThpO3CxXTvjJgAcHlsdsGOv8iAujjvZ80n7MBrPUAm1kBpMpsR5sxX4bWqg5sgL37TRl0hMOv0ho7PsQEQdB04t89/1O/w1cDnyilFU=";
let response;
initializeApp();
const db = getFirestore();
exports.addLink = onRequest({ cors: true, region: "asia-east1" }, async (req, res) => {
  async function saveToFireStore(newLink) {
    const now = new Date();
    const collectionName = String(now.getFullYear());
    const documentName = `${String(now.getMonth() + 1).padStart(
      2,
      "0"
    )}${String(now.getDate()).padStart(2, "0")}`;
    let linksArray = [];
    let results;
    try {
      const docRef = db.collection(collectionName).doc(documentName);
      var existingLinks = await docRef.get();
      const existingLinksSet = existingLinks.exists
        ? new Set(await existingLinks.data().links)
        : new Set([]);
      existingLinksSet.add(newLink);
      linksArray = Array.from(existingLinksSet);
      await docRef.set({ links: linksArray });
      results = "Link saved";
    } catch (error) {
      results = error;
    }
    return results;
  }

  if (req.body.events[0].type === "message") {
    response = await saveToFireStore(req.body.events[0].message.text);

    const dataString = JSON.stringify({
      replyToken: req.body.events[0].replyToken,
      messages: [
        {
          type: "text",
          text: await response,
        },
      ],
    });

    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + TOKEN,
    };

    const webhookOptions = {
      hostname: "api.line.me",
      path: "/v2/bot/message/reply",
      method: "POST",
      headers: headers,
      body: dataString,
    };

    const request = https.request(webhookOptions, (res) => {
      res.on("data", (d) => {
        process.stdout.write(d);
      });
    });

    request.on("error", (err) => {
      console.error(err);
    });

    request.write(dataString);
    request.end();
  }

  res.send(response);
});
