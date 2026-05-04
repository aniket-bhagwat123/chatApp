import dotenv from 'dotenv';
import connectDB from './config/db';
import app from './app';
import http from 'http';
import { initWebSocket } from './modules/socket/websocket.service';

dotenv.config();

// Initialize WebSocket
const server = http.createServer(app);
initWebSocket(server);

// Connection to MongoDB
connectDB(process.env.MONGO_URI as string);

// PORT
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
