// scripts/check-notices.ts
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function check() {
  await mongoose.connect("mongodb+srv://Faustino-Oro:ChessiIsComing@cluster0.pnjoz.mongodb.net/?appName=Cluster0");
  const db = mongoose.connection.db!;
  const collection = db.collection('notices');

  const total = await collection.countDocuments();
  const sample = await collection.find({}).limit(3).toArray();

  console.log(`\nTotal noticias: ${total}`);
  console.log('\n--- Muestra de 3 documentos ---');
  sample.forEach((n, i) => {
    console.log(`\n[${i + 1}] _id: ${n._id}`);
    console.log(`    title tipo: ${typeof n.title} | valor: ${JSON.stringify(n.title).slice(0, 60)}`);
    console.log(`    description tipo: ${typeof n.description}`);
    console.log(`    content tipo: ${typeof n.content}`);
  });

  await mongoose.disconnect();
}

check().catch(console.error);