import { Injectable } from '@nestjs/common';

import { EventEmitter2 } from 'eventemitter2';

import { Event } from '~/common/data';

@Injectable()
export class EventEmitterAdapter implements Event {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  emit(event: string, ...values: any[]): boolean {
    return this.eventEmitter.emit(event, ...values);
  }

  emitAsync(event: string, ...values: any[]): Promise<any[]> {
    return this.eventEmitter.emitAsync(event, ...values);
  }
}
