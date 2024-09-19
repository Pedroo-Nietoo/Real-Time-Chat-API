import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(3031, { cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
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

  @SubscribeMessage('private-message')
  handlePrivateMessage(
    client: Socket,
    payload: { receiverId: string; message: string },
  ) {
    const { receiverId, message } = payload;
    this.server.to(receiverId).emit('private-message', {
      senderId: client.id,
      message,
    });
  }

  @SubscribeMessage('join-room')
  handleJoinRoom(client: Socket, room: string) {
    client.join(room['data']);
    client.to(room['data']).emit('user-joined', {
      message: `${client.id} joined room ${room['data']}`,
    });
  }

  @SubscribeMessage('group-message')
  handleGroupMessage(
    client: Socket,
    payload: { room: string; message: string },
  ) {
    const { room, message } = payload;

    client.to(room).emit('group-message', {
      senderId: client.id,
      message,
    });
  }

  @SubscribeMessage('leave-room')
  handleLeaveRoom(client: Socket, room: string) {
    client.leave(room['data']);
    client.to(room['data']).emit('user-left', {
      message: `${client.id} left room ${room['data']}`,
    });
  }
}
