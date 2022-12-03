import { connect } from 'mongoose';

const connectDB = async () => {
  try {
    const mongoURI: any = process.env.MONGO_URI;
    await connect(mongoURI);
    console.log('MongoDB Connected...');
  } catch (err) {
    // Exit process with failure
    console.log(err);
    process.exit(1);
  }
};

export default connectDB;
