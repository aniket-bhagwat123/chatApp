import { Server } from "http";
import WebSocket, { WebSocketServer } from "ws";
import Message from "./message.model";
import { verifyJwtToken } from "../../utils/generateJwtToken";

interface Client {
  userId: string;
  socket: WebSocket;
}

const clients: Client[] = [];

export const initWebSocket = (server: Server) => {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws: WebSocket, req: any) => {
     try {
      const token = req.headers.token;

      if (!token) {
        console.log("No token provided");
        ws.close();
        return;
      }

      // ✅ VERIFY TOKEN
      const decoded: any = verifyJwtToken(token);

      // ✅ Attach user to socket
      (ws as any).userId = decoded.userId;

      // ✅ Store client
      clients.push({
        userId: decoded.userId,
        socket: ws,
      });

    } catch (err) {
      console.log("Invalid token");
      ws.close();
      return;
    }

    ws.on("message", (message: string) => {
      try {
        const data = JSON.parse(message.toString());

        switch (data.type) {
          case "SEND_MESSAGE":
            handleSendMessage(data);
            break;

          default:
            console.log("Unknown message type");
        }
      } catch (err) {
        console.error("Invalid message", err);
      }
    });

    ws.on("close", () => {
      removeClient(ws);
      console.log("Client disconnected");
    });
  });
};

// Send message (1-to-1)
const handleSendMessage = async (data: any) => {
  const { from, to, message } = data;

  // 1. Save to DB
  const newMessage = await Message.create({
    from,
    to,
    message,
  });
  
  const receiver = clients.find(c => String(c.userId) === String(to));

  if (receiver) {
    receiver.socket.send(
      JSON.stringify({
        type: "RECEIVE_MESSAGE",
        from,
        message,
        createdAt: newMessage.createdAt,
      })
    );
  }
};

// Remove disconnected client
const removeClient = (ws: WebSocket) => {
  const index = clients.findIndex(c => c.socket === ws);
  if (index !== -1) {
    clients.splice(index, 1);
  }
};