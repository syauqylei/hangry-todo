import { connect } from 'mongoose';

const connectDB = async () => {
  try {
    const mongoURI: any = process.env.MONGO_URI;
    await connect(mongoURI);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err);
    // Exit process with failure
    process.exit(1);
  }
};

export default connectDB;
