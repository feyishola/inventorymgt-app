const admin = require("firebase-admin");
const serviceAccount = require("../../servicedetails.json");

// Initialize Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "fy-inventory-app.appspot.com",
});

// Initialize Firebase bucket
const bucket = admin.storage().bucket();

// Upload Images to Firebase storage and returns url
async function uploadImageToFireBase(imageBuffer, imageName) {
  const file = bucket.file(imageName);
  await file.save(imageBuffer, {
    metadata: {
      contentType: "image/jpeg",
    },
    public: true,
  });
  return file.publicUrl();
}

module.exports = uploadImageToFireBase;
