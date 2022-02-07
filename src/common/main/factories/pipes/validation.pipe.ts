import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';

export const makeValidationPipe = () => {
  function transformError(error: ValidationError) {
    return {
      value: error.value,
      field: error.property,
      validation: error.constraints,
      children: error.children?.map(transformError),
    };
  }

  return new ValidationPipe({
    transform: true,
    transformOptions: { strategy: 'excludeAll' },
    whitelist: true,
    exceptionFactory: errors => {
      return new BadRequestException(errors.map(transformError));
    },
  });
};
