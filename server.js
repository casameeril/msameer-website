require('dotenv').config();
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

const app = express();
const PORT = 3000;
const JWT_SECRET = 'msameer_admin_secret_2025';

// Initialize Firebase
const serviceAccount = require("./m-sameer-co-firebase-adminsdk-fbsvc-973300f9bd.json");
initializeApp({
  credential: cert(serviceAccount)
});
const db = getFirestore();

// Mail Transporter Setup
const mailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'Casameerilahi@gmail.com',
    pass: 'adce ncyammnqfxtq'.replace(/\s/g, '')
  }
});

// Admin credentials (hashed)
const ADMIN = {
  username: 'admin',
  password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' // password: "password"
};

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Multer for Cloudinary image uploads
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'ca_sameer_services',
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp']
  }
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

// Auth middleware
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// ─── AUTH ───────────────────────────────────────────────────────────
app.post('/api/admin/login', async (req, res) => {
  const { username, password } = req.body;
  if (username !== ADMIN.username) return res.status(401).json({ error: 'Invalid credentials' });
  const valid = await bcrypt.compare(password, ADMIN.password);
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '24h' });
  res.json({ token, username });
});

// ─── SERVICES API (Public) ───────────────────────────────────────────
app.get('/api/services', async (req, res) => {
  try {
    const snapshot = await db.collection('services').get();
    const services = snapshot.docs.map(doc => doc.data());
    // Sort by id mathematically
    services.sort((a, b) => Number(a.id) - Number(b.id));
    res.json(services);
  } catch (error) {
    console.error(error);
    res.status(500).json([]);
  }
});

// ─── SERVICES API (Admin) ────────────────────────────────────────────
app.post('/api/admin/services', authMiddleware, upload.single('image'), async (req, res) => {
  const { title, icon, imageUrl, points } = req.body;
  const newService = {
    id: Date.now().toString(),
    title,
    icon: icon || 'star',
    image: req.file ? req.file.path : imageUrl, // req.file.path contains the Cloudinary URL
    points: JSON.parse(points || '[]')
  };
  await db.collection('services').doc(newService.id).set(newService);
  res.json(newService);
});

app.put('/api/admin/services/:id', authMiddleware, upload.single('image'), async (req, res) => {
  const docRef = db.collection('services').doc(req.params.id);
  const docSnap = await docRef.get();
  if (!docSnap.exists) return res.status(404).json({ error: 'Not found' });
  
  const current = docSnap.data();
  const { title, icon, imageUrl, points } = req.body;
  const updatedService = {
    ...current,
    title: title || current.title,
    icon: icon || current.icon,
    image: req.file ? req.file.path : (imageUrl || current.image),
    points: points ? JSON.parse(points) : current.points
  };
  
  await docRef.update(updatedService);
  res.json(updatedService);
});

app.delete('/api/admin/services/:id', authMiddleware, async (req, res) => {
  const docRef = db.collection('services').doc(req.params.id);
  const docSnap = await docRef.get();
  if (!docSnap.exists) return res.status(404).json({ error: 'Not found' });
  
  const service = docSnap.data();
  // Delete from Cloudinary if it's a Cloudinary URL
  if (service.image && service.image.includes('res.cloudinary.com')) {
    try {
      // Extract public_id from Cloudinary URL
      const parts = service.image.split('/');
      const filename = parts[parts.length - 1];
      const publicId = 'ca_sameer_services/' + filename.split('.')[0];
      await cloudinary.uploader.destroy(publicId);
    } catch (err) {
      console.error('Failed to delete image from Cloudinary', err);
    }
  } else if (service.image && service.image.startsWith('/uploads/')) {
    // Fallback for old local images
    const filePath = path.join(__dirname, service.image);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  }
  
  await docRef.delete();
  res.json({ success: true });
});

// ─── CONSULTATIONS API ────────────────────────────────────────────────
// Public: Submit a consultation
app.post('/api/consultations', async (req, res) => {
  const { name, email, phone, service, message } = req.body;
  if (!name || !phone) return res.status(400).json({ error: 'Name and phone are required' });
  
  const entry = {
    id: Date.now().toString(),
    name, email, phone, service, message,
    status: 'new',
    createdAt: new Date().toISOString()
  };
  
  await db.collection('consultations').doc(entry.id).set(entry);

  // Send Email Notification to Admin
  try {
    const mailOptions = {
      from: '"M Sameer & Co. Website" <Casameerilahi@gmail.com>',
      to: 'Casameerilahi@gmail.com',
      subject: `New Consultation Request from ${name}`,
      html: `
        <h2>New Consultation Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email || 'N/A'}</p>
        <p><strong>Service Needed:</strong> ${service || 'N/A'}</p>
        <p><strong>Message:</strong><br/>${message || 'N/A'}</p>
        <hr/>
        <p><a href="https://www.casameerilahi.com/admin">Click here to view in Admin Panel</a></p>
      `
    };
    await mailTransporter.sendMail(mailOptions);
  } catch (mailError) {
    console.error("Failed to send notification email:", mailError);
  }

  // Send Auto-Reply to User
  if (email) {
    try {
      const userMailOptions = {
        from: '"M Sameer & Company" <Casameerilahi@gmail.com>',
        to: email,
        subject: 'Thank you for contacting M Sameer & Company',
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <h2>Thank You for Connecting with Us</h2>
            <p>Dear ${name},</p>
            <p>We have successfully received your consultation request regarding <strong>${service || 'our services'}</strong>.</p>
            <p>Our team of financial experts is reviewing your query and will reach out to you within the next <strong>24 hours</strong> on your provided mobile number (${phone}).</p>
            <br>
            <p>Best Regards,</p>
            <p><strong>M Sameer & Company</strong><br>
            Chartered Accountants<br>
            <a href="https://www.casameerilahi.com">www.casameerilahi.com</a></p>
          </div>
        `
      };
      await mailTransporter.sendMail(userMailOptions);
    } catch (userMailError) {
      console.error("Failed to send auto-reply email to user:", userMailError);
    }
  }

  res.json({ success: true, id: entry.id });
});

// Admin: View all consultations
app.get('/api/admin/consultations', authMiddleware, async (req, res) => {
  try {
    const snapshot = await db.collection('consultations').orderBy('createdAt', 'desc').get();
    const consultations = snapshot.docs.map(doc => doc.data());
    res.json(consultations);
  } catch (error) {
    console.error(error);
    res.status(500).json([]);
  }
});

// Admin: Update consultation status
app.patch('/api/admin/consultations/:id', authMiddleware, async (req, res) => {
  const docRef = db.collection('consultations').doc(req.params.id);
  const docSnap = await docRef.get();
  if (!docSnap.exists) return res.status(404).json({ error: 'Not found' });
  
  await docRef.update({ status: req.body.status || docSnap.data().status });
  const updatedDoc = await docRef.get();
  res.json(updatedDoc.data());
});

// Admin: Delete consultation
app.delete('/api/admin/consultations/:id', authMiddleware, async (req, res) => {
  await db.collection('consultations').doc(req.params.id).delete();
  res.json({ success: true });
});

// ─── Admin panel static ──────────────────────────────────────────────
app.use('/admin', (req, res, next) => {
  if (req.path.startsWith('/api/')) return next();
  res.sendFile(path.join(__dirname, 'admin', 'index.html'));
});

// Start
app.listen(PORT, () => {
  console.log(`\n✅ M Sameer & Company Server running at http://localhost:${PORT}`);
  console.log(`   🔥 Firebase Database Connected Successfully!`);
  console.log(`   Admin Panel: http://localhost:${PORT}/admin`);
  console.log(`   Admin login: admin / password\n`);
});
