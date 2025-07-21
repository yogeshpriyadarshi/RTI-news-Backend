// In your news publishing logic
const newsTitle = "🚨 Breaking: Major News Event";
const newsSummary = "Check out the latest update on national news";

// Fetch all user FCM tokens from DB
const tokens = [
  "fcm_token_1",
  "fcm_token_2",
  "fcm_token_3",
];

tokens.forEach(token => {
  sendNewsNotification(token, newsTitle, newsSummary);
});
