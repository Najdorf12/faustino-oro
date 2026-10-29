import mongoose from "mongoose";

const uri = process.env.MONGO; // ajustá el nombre si tu variable se llama distinto
if (!uri) {
  console.error("Falta MONGO en las variables de entorno");
  process.exit(1);
}

const DRY_RUN = process.argv.includes("--dry");

async function run() {
  await mongoose.connect(uri);
  const col = mongoose.connection.collection("tournaments");

  const total = await col.countDocuments();
  const sinCampo = await col.countDocuments({ title_en: { $exists: false } });

  console.log(`Base: ${mongoose.connection.name}`);
  console.log(`Total de torneos: ${total}`);
  console.log(`Sin title_en: ${sinCampo}`);

  if (DRY_RUN) {
    console.log("Modo --dry: no se modificó nada.");
  } else {
    const result = await col.updateMany(
      { title_en: { $exists: false } },
      { $set: { title_en: "" } },
    );
    console.log(`Modificados: ${result.modifiedCount}`);
  }

  await mongoose.disconnect();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});