import mongoose from "mongoose";

const connectDB = async function () {
  try {
   const res =  await mongoose.connect(process.env.MONGODB_URL)
   console.log('Connected to mongodb...');
  //  console.log(res);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

export default connectDB;