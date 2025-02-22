import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket } from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Socket ,Server} from 'socket.io';

@WebSocketGateway({
  cors:{
    origin:'*'
  }
})
export class MessagesGateway {

  @WebSocketServer()
  server:Server;

  constructor(private readonly messagesService: MessagesService) {}

  @SubscribeMessage('createMessage')

  async create(@MessageBody() createMessageDto: CreateMessageDto, @ConnectedSocket() client:Socket) {
    const message= this.messagesService.create(createMessageDto, client.id);
    this.server.emit('message',message)
    return message
  }

  @SubscribeMessage('findAllMessages')
  findAll() {
    return this.messagesService.findAll();
  }

  @SubscribeMessage('joinRoom')
    joinRoom(
    @MessageBody('name') name:string,
    @ConnectedSocket() client:Socket
  ){
    return this.messagesService.identify(name,client.id)
  }

  
  @SubscribeMessage('typing')
  async typing(
    @MessageBody('isTyping') isTyping:boolean,
    @ConnectedSocket() client:Socket
  ){
    const name=this.messagesService.getClientByName(client.id);
    client.broadcast.emit('typing',{name, isTyping})
  }
 
}
