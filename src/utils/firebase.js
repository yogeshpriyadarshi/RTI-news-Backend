// fcmService.js
const admin = require("firebase-admin");
const serviceAccount = require("./serviceFirebase.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = {admin};