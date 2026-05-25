import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function migrate() {
  await mongoose.connect("mongodb+srv://Faustino-Oro:ChessiIsComing@cluster0.pnjoz.mongodb.net/?appName=Cluster0");
  const db = mongoose.connection.db!;
  const collection = db.collection('achievements');

  const docs = await collection.find({}).toArray();
  console.log(`\nMigrando ${docs.length} logros...\n`);

  let migrated = 0;
  let skipped = 0;
  let errors = 0;

  for (const doc of docs) {
    try {
      // Si ya fue migrado, saltar
      if (typeof doc.title === 'object' && doc.title?.es) {
        console.log(`⏭️  Saltado: "${String(doc.title?.es ?? doc.title).slice(0, 50)}"`);
        skipped++;
        continue;
      }

      const es = doc.title_es || doc.title || '';
      const en = doc.title_en || '';

      await collection.updateOne(
        { _id: doc._id },
        {
          $set: { title: { es, en } },
          $unset: { title_es: '', title_en: '' },
        }
      );

      console.log(`✅ Migrado: "${es.slice(0, 50)}"`);
      migrated++;
    } catch (e) {
      console.error(`❌ Error en _id ${doc._id}:`, e);
      errors++;
    }
  }

  console.log(`\n─────────────────────────────`);
  console.log(`✅ Migrados: ${migrated}`);
  console.log(`⏭️  Saltados: ${skipped}`);
  console.log(`❌ Errores:  ${errors}`);
  console.log(`─────────────────────────────\n`);

  await mongoose.disconnect();
}

migrate().catch(console.error);