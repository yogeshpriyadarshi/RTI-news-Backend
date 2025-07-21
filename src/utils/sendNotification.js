const admin = require("firebase-admin");
const serviceAccount = require("../config/rti-news-19738-firebase-adminsdk-fbsvc-6340cbf772.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Replace this with user's device token (you get it from frontend)
const userFcmToken = "USER_DEVICE_FCM_TOKEN";

// Notification payload
const message = {
  notification: {
    title: "📰 Breaking News!",
    body: "New article just published. Tap to read.",
  },
  token: userFcmToken,
};

admin.messaging().send(message)
  .then((response) => {
    console.log("Notification sent:", response);
  })
  .catch((error) => {
    console.error("Error sending notification:", error);
  });
