require('dotenv').config();
const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const cloudinary = require('cloudinary').v2;

const serviceAccount = require("./m-sameer-co-firebase-adminsdk-fbsvc-973300f9bd.json");

initializeApp({
  credential: cert(serviceAccount)
});
const db = getFirestore();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

async function migrateImages() {
  try {
    console.log("Starting image migration to Cloudinary...");
    const snapshot = await db.collection('services').get();
    
    for (const doc of snapshot.docs) {
      const service = doc.data();
      const imageUrl = service.image;
      
      // If there's an image and it's not already on Cloudinary
      if (imageUrl && !imageUrl.includes('res.cloudinary.com')) {
        console.log(`Uploading image for ${service.title}...`);
        
        try {
          const result = await cloudinary.uploader.upload(imageUrl, {
            folder: 'ca_sameer_services',
            allowed_formats: ['jpg', 'png', 'jpeg', 'webp']
          });
          
          // Update the document with the new Cloudinary URL
          await db.collection('services').doc(service.id).update({
            image: result.secure_url
          });
          
          console.log(`✅ Uploaded ${service.title} successfully.`);
        } catch (uploadError) {
          console.error(`❌ Failed to upload image for ${service.title}:`, uploadError.message || uploadError);
        }
      } else {
        console.log(`⏭️  Skipping ${service.title} (already on Cloudinary or no image).`);
      }
    }
    
    console.log("Image migration complete!");
    process.exit(0);
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
}

migrateImages();
