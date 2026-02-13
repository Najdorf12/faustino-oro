import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGO!;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGO environment variable");
}

declare global {
  var mongooseGlobal: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

global.mongooseGlobal ||= { conn: null, promise: null };

async function connectToDatabase() {
  if (global.mongooseGlobal.conn) return global.mongooseGlobal.conn;

  if (!global.mongooseGlobal.promise) {
    global.mongooseGlobal.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }

  global.mongooseGlobal.conn = await global.mongooseGlobal.promise;
  return global.mongooseGlobal.conn;
}

export default connectToDatabase;
