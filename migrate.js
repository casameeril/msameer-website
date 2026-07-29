const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const fs = require("fs");
const path = require("path");

const serviceAccount = require("./m-sameer-co-firebase-adminsdk-fbsvc-973300f9bd.json");

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

async function migrateData() {
  try {
    console.log("Starting migration...");
    
    // Migrate Services
    const services = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'services.json'), 'utf-8'));
    for (const service of services) {
      await db.collection('services').doc(service.id).set(service);
      console.log(`Migrated service: ${service.title}`);
    }
    
    // Migrate Consultations
    const consultations = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'consultations.json'), 'utf-8'));
    for (const consultation of consultations) {
      await db.collection('consultations').doc(consultation.id).set(consultation);
      console.log(`Migrated consultation from: ${consultation.name}`);
    }
    
    console.log("Migration complete!");
    process.exit(0);
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
}

migrateData();
