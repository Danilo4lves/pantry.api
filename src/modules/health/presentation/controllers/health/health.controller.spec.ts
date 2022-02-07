import { HealthCheckService, TypeOrmHealthIndicator } from '@nestjs/terminus';
import { Test, TestingModule } from '@nestjs/testing';

import { HealthController } from './health.controller';

describe('HealthController', () => {
  const healthCheckServiceMockFactory = () => ({
    check: jest.fn(indicators => indicators.forEach(indicator => indicator())),
  });
  const typeOrmHealthIndicatorMockFactory = () => ({ pingCheck: jest.fn() });

  let sut: HealthController;
  let healthCheckService: HealthCheckService;
  let typeOrmHealthIndicator: TypeOrmHealthIndicator;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [
        {
          provide: HealthCheckService,
          useFactory: healthCheckServiceMockFactory,
        },
        {
          provide: TypeOrmHealthIndicator,
          useFactory: typeOrmHealthIndicatorMockFactory,
        },
      ],
    }).compile();

    sut = module.get(HealthController);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    healthCheckService = module.get(HealthCheckService);
    typeOrmHealthIndicator = module.get(TypeOrmHealthIndicator);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should check database health', async () => {
    await sut.check();

    const resultObjectKey = 'database';
    const timeout = 1500;

    expect(typeOrmHealthIndicator.pingCheck).toHaveBeenCalledWith(
      resultObjectKey,
      { timeout },
    );
  });
});
