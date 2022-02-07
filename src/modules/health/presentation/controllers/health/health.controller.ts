import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

import { IgnoreExceptionsInterceptor } from '~/common';

@Controller('health')
export class HealthController {
  constructor(
    private readonly healthCheckService: HealthCheckService,
    private readonly typeOrmHealthIndicator: TypeOrmHealthIndicator,
  ) {}

  private checkDatabase() {
    return () =>
      this.typeOrmHealthIndicator.pingCheck('database', { timeout: 1500 });
  }

  @Get()
  @HealthCheck()
  @IgnoreExceptionsInterceptor()
  async check() {
    const response = await this.healthCheckService.check([
      this.checkDatabase(),
    ]);

    return response;
  }
}
