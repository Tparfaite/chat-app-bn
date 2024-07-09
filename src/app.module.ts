import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'mysql',
      host:'localhost',
      port:3306,
      username:'root',
      password:'',
      database:'chatapp',
      entities:['dist/**/*.entity{.ts,.js}'],
      synchronize:true
      }),
    MessagesModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
