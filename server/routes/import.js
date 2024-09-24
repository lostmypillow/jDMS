import { onRequest } from "firebase-functions/v2/https";
import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { dmsScrape } from "dms-scrape";
import { https } from "https";
import { v4 as uuid } from "uuid";
const TOKEN =
  "sPG4KE13zYqCaelVJCXHqOpB1jt+N49pmFgpukjxT6E/Wg5V/1+goJ+dHUiu8r0molbYThpO3CxXTvjJgAcHlsdsGOv8iAujjvZ80n7MBrPUAm1kBpMpsR5sxX4bWqg5sgL37TRl0hMOv0ho7PsQEQdB04t89/1O/w1cDnyilFU=";
let response;
initializeApp();
const db = getFirestore();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  async function saveToFireStore(newLink) {
    const now = new Date();
    const collectionName =
      String(now.getFullYear()) +
      "-" +
      String(now.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(now.getDate()).padStart(2, "0");
    const collectionNameU =
      String(now.getFullYear()) +
      "-" +
      String(now.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(now.getDate()).padStart(2, "0") +
      "u";
    let linksArray = [];
    let results;
    const docRef = db.collection(collectionName);
    const docRefU = db.collection(collectionNameU);
    try {
      const snapshot = await docRef.where("url", "==", newLink).get();
      const snapshotu = await docRefU.where("url", "==", newLink).get();
      if (snapshot.empty && snapshotu.empty) {
        console.log("No matching documents.");
        const response = await dmsScrape("link", newLink);
        console.log("dmsScrape says:", await response);
        if ((await response).error == "unsupported link") {
          const res = await docRefU.add(await response);
          console.log("Added unsupported document with ID: ", res.id);
        } else {
          const res = await docRef.add(await response);
          console.log("Added supported document with ID: ", res.id);
        }

        return;
      } else {
        console.log("document found, doing nothing");
      }

      //   .doc(documentName);
      //   var existingLinks = await docRef.get();
      //   const existingLinksSet = existingLinks.exists
      //     ? new Set(await existingLinks.data().links)
      //     : new Set([]);
      //   existingLinksSet.add(newLink);
      //   linksArray = Array.from(existingLinksSet);
      //   await docRef.set({ links: linksArray });
      //   results = "Link saved";
    } catch (error) {
      console.log(error);
    }
    // return results;
  }

  if (body.events[0].type === "message") {
    await saveToFireStore(body.events[0].message.text);

    //   const dataString = JSON.stringify({
    //     replyToken: req.body.events[0].replyToken,
    //     messages: [
    //       {
    //         type: "text",
    //         text: await response,
    //       },
    //     ],
    //   });

    //   const headers = {
    //     "Content-Type": "application/json",
    //     Authorization: "Bearer " + TOKEN,
    //   };

    //   const webhookOptions = {
    //     hostname: "api.line.me",
    //     path: "/v2/bot/message/reply",
    //     method: "POST",
    //     headers: headers,
    //     body: dataString,
    //   };

    //   const request = https.request(webhookOptions, (res) => {
    //     res.on("data", (d) => {
    //       process.stdout.write(d);
    //     });
    //   });

    //   request.on("error", (err) => {
    //     console.error(err);
    //   });

    //   request.write(dataString);
    //   request.end();
  }

  return "meow";
});
