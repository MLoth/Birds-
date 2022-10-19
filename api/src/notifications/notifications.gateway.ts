import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { WebSocketServer } from '@nestjs/websockets'
import { LivelocationsService } from 'src/livelocations/livelocations.service'
import { LocationsService } from 'src/locations/locations.service'
import { CreateLivelocationInput } from 'src/livelocations/dto/create-livelocation.input'
import { Livelocation } from 'src/livelocations/entities/livelocation.entity'
import { UsePipes } from '@nestjs/common'
import { MyWebSocketValidationPipe } from 'src/bootstrap/exceptions/MyWebSocketValidationPipe'

@WebSocketGateway()
export class NotificationsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly livelocationsService: LivelocationsService,
    private readonly locationsService: LocationsService,
  ) {}

  @WebSocketServer() //ipv afterInit()
  server: Server

  numberOfClients = 0

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    console.log(payload)
    //throw new WsException('Method not implemented.')
    return 'Hello world!'
  }

  @UsePipes(new MyWebSocketValidationPipe())
  @SubscribeMessage('birdspotter:moving')
  async handleBirdspotterMoving(
    @MessageBody() data: CreateLivelocationInput,
    @ConnectedSocket() client: Socket,
  ): Promise<Livelocation> {
    console.log('🐦')
    console.log(data)
    const liveLocation = await this.livelocationsService.create(data)
    const location = await this.locationsService.findLocationByPoint(
      liveLocation.geolocation,
    )
    if (location.length > 0) {
      console.log('in a known area/location')
      console.log(location[0].name)
      console.log(`Rooms of this client:`, client.rooms)
      client.join(location[0].name)
      console.log(`Rooms of this client:`, client.rooms)
      // this.server.emit('birdspotter:newlocation', liveLoc)
      this.server
        .to(location[0].name)
        .emit('birdspotter:newlocation', liveLocation)
    } else {
      console.log('not in a known area/location')
    }

    return Promise.resolve(liveLocation)
  }

  handleDisconnect(client: any) {
    //throw new Error('Method not implemented.')
    this.numberOfClients--
    this.server.emit('users:userLeaving', {
      connectedUsers: this.numberOfClients,
    })
  }

  handleConnection(client: any, ...args: any[]) {
    this.numberOfClients++
    // Notify connected clients of current users
    this.server.emit('users:newuserconnetected', {
      connectedUsers: this.numberOfClients,
    })
    console.log('A client has connected')
    console.log(`${this.numberOfClients} clients`)
  }
}
