import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ChatGateway } from './modules/chat/chat-gateway';
import { ChatModule } from './modules/chat/chat.module';

@Module({
  imports: [ChatModule, UsersModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, ChatGateway],
})
export class AppModule {}
