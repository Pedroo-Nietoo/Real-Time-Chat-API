import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(3031, { cors: { origin: '*' } })
export class ChatGateway {
  @WebSocketServer() server: Server;

  handleConnection(client: Socket) {
    client.broadcast.emit('user-joined', {
      message: `${client.id} joined the chat`,
    });
  }

  handleDisconnect(client: Socket) {
    this.server.emit('user-left', {
      message: `${client.id} left the chat`,
    });
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, message: any) {
    this.server.emit('message', message);
  }
}
