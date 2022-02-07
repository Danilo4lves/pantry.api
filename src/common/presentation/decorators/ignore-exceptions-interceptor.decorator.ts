import { SetMetadata } from '@nestjs/common';

import { IGNORES_EXCEPTIONS_INTERCEPTOR } from '~/common/constants';

export function IgnoreExceptionsInterceptor() {
  return SetMetadata(IGNORES_EXCEPTIONS_INTERCEPTOR, true);
}
