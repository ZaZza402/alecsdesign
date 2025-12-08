import nodemailer from "nodemailer";

// ---------------------------------------------------
// 1. ENTER YOUR CREDENTIALS HERE FOR TESTING
// ---------------------------------------------------
const config = {
  user: "start@alecsdesign.xyz",
  pass: "YOUR_PASSWORD_HERE", // <--- REPLACE THIS WITH YOUR PASSWORD
};

// ---------------------------------------------------
// 2. RUN THIS SCRIPT: node test-smtp.js
// ---------------------------------------------------

async function testConnection() {
  if (config.pass === "YOUR_PASSWORD_HERE") {
    console.error(
      "❌ ERROR: You must replace 'YOUR_PASSWORD_HERE' with your actual password in the script."
    );
    return;
  }

  // Configuration 1: Namecheap Private Email (Most likely)
  console.log("\n🔵 TEST 1: Namecheap Private Email (mail.privateemail.com)");
  await tryConnect("mail.privateemail.com", 465, true);

  // Configuration 2: Namecheap Shared Hosting (cPanel)
  console.log("\n🔵 TEST 2: Shared Hosting (mail.alecsdesign.xyz)");
  await tryConnect("mail.alecsdesign.xyz", 465, true);
}

async function tryConnect(host, port, secure) {
  console.log(`Attempting connection to ${host}:${port}...`);

  const transporter = nodemailer.createTransport({
    host: host,
    port: port,
    secure: secure,
    auth: {
      user: config.user,
      pass: config.pass,
    },
    tls: { rejectUnauthorized: false }, // Relaxed security for testing
  });

  try {
    await transporter.verify();
    console.log(`✅ SUCCESS! ${host} is the correct server.`);
    console.log(`👉 Update Vercel EMAIL_HOST to: ${host}`);
  } catch (error) {
    console.error(`❌ FAILED with ${host}`);
    console.error(`   Error: ${error.message}`);
  }
}

testConnection();
