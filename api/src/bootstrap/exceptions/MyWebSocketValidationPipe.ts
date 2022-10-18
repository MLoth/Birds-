import {
    Injectable,
    ValidationPipe,
    ValidationError,
  } from '@nestjs/common'
  
  import { WsException } from '@nestjs/websockets'
  
  @Injectable()
  export class MyWebSocketValidationPipe extends ValidationPipe {
    
    createExceptionFactory(): (validationErrors?: ValidationError[]) => WsException {
      return (validationErrors?: ValidationError[]) => {
        if (this.isDetailedOutputDisabled) {
          return new WsException('Bad request')
        } else {
          const errors = this.flattenValidationErrors(validationErrors)
          return new WsException(errors)
        }
      }
    }
    
  }