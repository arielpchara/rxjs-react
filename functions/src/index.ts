import { https, logger } from "firebase-functions";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = https.onRequest((request, response) => {
  logger.info("Hello logs!", { structuredData: true });
  response.send(`params from request ${Object.keys(request.params).join("/")}`);
});
