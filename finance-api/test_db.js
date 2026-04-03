require('dotenv').config();
const db = require('./src/config/db');
const authService = require('./src/modules/auth/auth.service');

async function test() {
  try {
    console.log("Testing DB Connection...");
    await db.raw('SELECT 1');
    console.log("Testing Auth Service...");
    const res = await authService.login('admin@finance.local', 'admin123');
    console.log("Success:", res.user.email);
  } catch(e) {
    console.error("ERROR FOUND:", e.message);
    if (e.code) console.error("CODE:", e.code);
  } finally {
    process.exit(0);
  }
}
test();
