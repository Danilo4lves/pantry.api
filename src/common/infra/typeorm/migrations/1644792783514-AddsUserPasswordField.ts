import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddsUserPasswordField1644792783514 implements MigrationInterface {
  name = 'AddsUserPasswordField1644792783514';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "Users" ADD "password" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "Users" DROP COLUMN "password"`);
  }
}
