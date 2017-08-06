import mongoose from 'mongoose';

mongoose.Promise = Promise;

mongoose.connection
  .on('connected', () => {
    console.log('Mongoose Connected');
  })
  .on('error', err => {
  console.log('Mongoose default connection error: ' + err);
  })
  .on('disconnected', () => {
    console.log('Mongoose default connection disconnected');
  });

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

mongoose.connect(`mongodb://${encodeURIComponent(process.env.MONGO_DB_USER)}:${encodeURIComponent(process.env.MONGO_DB_PASS)}@${process.env.MONGO_DB_URI}`, {
  useMongoClient: true
});

// todo inform user if DB cannot connect.

export default mongoose;