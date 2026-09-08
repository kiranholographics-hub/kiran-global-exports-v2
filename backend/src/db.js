import mongoose from 'mongoose';

let connectPromise = null;

export function connectDB() {
  if (connectPromise) return connectPromise;

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.warn(
      '[db] MONGODB_URI is not set — the API will start but any database ' +
        'read/write will fail. Copy backend/.env.example to backend/.env and fill it in.'
    );
    return Promise.resolve(null);
  }

  mongoose.set('strictQuery', true);

  connectPromise = mongoose
    .connect(uri)
    .then((conn) => {
      console.log(`[db] connected to MongoDB (${conn.connection.name})`);
      return conn;
    })
    .catch((err) => {
      console.error('[db] connection error:', err.message);
      connectPromise = null;
      throw err;
    });

  return connectPromise;
}

export default mongoose;
