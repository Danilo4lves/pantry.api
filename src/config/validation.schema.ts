import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'homolog', 'production')
    .default('production'),
  PORT: Joi.any().default(process.env.PORT || 3333),

  THROTTLE_TTL: Joi.number().required(),
  THROTTLE_LIMIT: Joi.number().required(),

  DB_TYPEORM_CONNECTION: Joi.string().default('postgres'),
  DB_TYPEORM_HOST: Joi.string().hostname(),
  DB_TYPEORM_PORT: Joi.number().optional(),
  DB_TYPEORM_DATABASE: Joi.string().required(),
  DB_TYPEORM_USERNAME: Joi.string().optional(),
  DB_TYPEORM_PASSWORD: Joi.string().optional(),
});
