import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddsUserRefreshTokenField1645145526484
  implements MigrationInterface
{
  name = 'AddsUserRefreshTokenField1645145526484';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "Users" ADD "refreshToken" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "Users" DROP COLUMN "refreshToken"`);
  }
}
