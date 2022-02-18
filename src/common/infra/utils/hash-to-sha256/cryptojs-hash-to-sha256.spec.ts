import { Test, TestingModule } from '@nestjs/testing';

import { HASH_TO_SHA256 } from '~/common/constants';
import { HashToSHA256 } from '~/common/data';

import { CryptojsHashToSHA256 } from './cryptojs-hash-to-sha256';

describe('CryptojsHashToSHA256', () => {
  let sut: HashToSHA256;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{ provide: HASH_TO_SHA256, useClass: CryptojsHashToSHA256 }],
    }).compile();

    sut = module.get(HASH_TO_SHA256);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should hash to sha256', () => {
    const message = 'pantry';
    const expected =
      'c244bfeada914d36e625b7f2e1862037ce6e54f114b499b2057ea27f9d33c697';

    const result = sut.hash(message);

    expect(result).toBe(expected);
  });
});
