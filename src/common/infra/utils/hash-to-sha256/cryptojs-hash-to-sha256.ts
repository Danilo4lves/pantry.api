import { Injectable } from '@nestjs/common';

import { SHA256 } from 'crypto-js';

import { HashToSHA256 } from '~/common/data';

@Injectable()
export class CryptojsHashToSHA256 implements HashToSHA256 {
  hash(message: string): string {
    return SHA256(message).toString();
  }
}
