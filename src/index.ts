import dotenv from 'dotenv';
import connectDB from './config/db';
import app from './app';

dotenv.config();

// Connection to MongoDB
connectDB(process.env.MONGO_URI as string);

// PORT
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
