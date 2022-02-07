import { SetMetadata } from '@nestjs/common';

import { IS_AN_UNTRANSFORMED_RESPONSE_ROUTE } from '~/common/constants';

export function UntransformedResponseRoute() {
  return SetMetadata(IS_AN_UNTRANSFORMED_RESPONSE_ROUTE, true);
}
