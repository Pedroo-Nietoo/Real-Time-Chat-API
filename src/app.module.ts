import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './modules/chat/chat.module';
import { ChatGateway } from './modules/chat/chat-gateway';

@Module({
  imports: [ChatModule],
  controllers: [AppController],
  providers: [AppService, ChatGateway],
})
export class AppModule {}
