import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function migrate() {
  await mongoose.connect("mongodb+srv://Faustino-Oro:ChessiIsComing@cluster0.pnjoz.mongodb.net/?appName=Cluster0");
  const db = mongoose.connection.db!;
  const collection = db.collection('notices');

  const notices = await collection.find({}).toArray();
  console.log(`\nMigrando ${notices.length} noticias...\n`);

  let migrated = 0;
  let skipped = 0;
  let errors = 0;

  for (const notice of notices) {
    try {
      // Si ya fue migrada, saltar
      if (typeof notice.title === 'object' && notice.title?.es) {
        console.log(`⏭️  Saltada: "${String(notice.title?.es ?? notice.title).slice(0, 40)}"`);
        skipped++;
        continue;
      }

      await collection.updateOne(
        { _id: notice._id },
        {
          $set: {
            title:       { es: notice.title       ?? '', en: notice.title       ?? '' },
            description: { es: notice.description ?? '', en: notice.description ?? '' },
            content:     { es: notice.content     ?? '', en: notice.content     ?? '' },
          },
        }
      );

      console.log(`✅ Migrada: "${String(notice.title).slice(0, 40)}"`);
      migrated++;
    } catch (e) {
      console.error(`❌ Error en _id ${notice._id}:`, e);
      errors++;
    }
  }

  console.log(`\n─────────────────────────────`);
  console.log(`✅ Migradas:  ${migrated}`);
  console.log(`⏭️  Saltadas:  ${skipped}`);
  console.log(`❌ Errores:   ${errors}`);
  console.log(`─────────────────────────────\n`);

  await mongoose.disconnect();
}

migrate().catch(console.error);