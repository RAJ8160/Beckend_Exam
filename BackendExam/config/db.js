import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config({
  path: './.env'
});

const connectDB = async()=>{
    try {
        const connection = await mongoose.connect(process.env.MONGO_URL)
        console.log(`MongoDb Connected Successfully! with `,connection.connection.host);
    } catch (error) {
        console.log('Error During Mongo DB Connection ',error);
        process.exit(1)
    }
}

export default connectDB