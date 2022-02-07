const { resolve } = require('path');

const isReleaseMode =
  process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'homolog';

const entities = [];
const migrations = [];

if (isReleaseMode) {
  const entitiesPath = resolve(
    __dirname,
    'dist',
    '**',
    'infra',
    'typeorm',
    'entities',
    '*.entity.js',
  );

  entities.push(entitiesPath);

  const migrationsPath = resolve(
    __dirname,
    'dist',
    'common',
    'infra',
    'typeorm',
    'migrations',
    '*.js',
  );

  migrations.push(migrationsPath);
} else {
  const entitiesPath = resolve(
    __dirname,
    'src',
    '**',
    'infra',
    'typeorm',
    'entities',
    '*.entity.ts',
  );

  entities.push(entitiesPath);

  const migrationsPath = resolve(
    __dirname,
    'src',
    'common',
    'infra',
    'typeorm',
    'migrations',
    '*.ts',
  );

  migrations.push(migrationsPath);
}

module.exports = {
  type: process.env.DB_TYPEORM_CONNECTION,
  host: process.env.DB_TYPEORM_HOST,
  username: process.env.DB_TYPEORM_USERNAME,
  password: process.env.DB_TYPEORM_PASSWORD,
  database: process.env.DB_TYPEORM_DATABASE,
  schema: process.env.DB_TYPEORM_SCHEMA,
  entities,
  migrations,
  options: {
    trustedConnection: true,
    trustServerCertificate: !isReleaseMode,
  },
  cli: {
    entitiesDir: 'src',
    migrationsDir: 'src/common/infra/typeorm/migrations',
  },
};
