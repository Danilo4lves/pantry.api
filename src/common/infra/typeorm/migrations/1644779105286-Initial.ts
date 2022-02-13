import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1644779105286 implements MigrationInterface {
  name = 'Initial1644779105286';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "Users" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "lastUpdatedAt" TIMESTAMP NOT NULL DEFAULT now(), "phone" integer, CONSTRAINT "PK_16d4f7d636df336db11d87413e3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "ProductGroups" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "lastUpdatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer NOT NULL, CONSTRAINT "PK_4720ab886a2661c6fe7da9e8c17" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "Products" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "barCode" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_36a07cc432789830e7fb7b58a83" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "GroupProducts" ("id" SERIAL NOT NULL, "price" integer NOT NULL, "expirationDate" TIMESTAMP NOT NULL, "buyDate" TIMESTAMP NOT NULL, "productId" integer, "groupId" integer NOT NULL, CONSTRAINT "PK_ce9790165712c4241e05fdfeba8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "Stores" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_022a637b625176bfdae30ce0167" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "GroupProductStorePrices" ("price" integer NOT NULL, "date" TIMESTAMP NOT NULL, "storeId" integer NOT NULL, "groupProductId" integer NOT NULL, CONSTRAINT "PK_7cbe4c0585ba1be16334b63fb43" PRIMARY KEY ("storeId", "groupProductId"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "ProductGroups" ADD CONSTRAINT "FK_7debff572a77c665e3ca780fa70" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "GroupProducts" ADD CONSTRAINT "FK_d8b0c5d135e7735bbe4449ee81f" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "GroupProducts" ADD CONSTRAINT "FK_e28f88545231e30ea1091241df6" FOREIGN KEY ("groupId") REFERENCES "ProductGroups"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "GroupProductStorePrices" ADD CONSTRAINT "FK_8106bfb6a6d07a3a0c0270c6807" FOREIGN KEY ("storeId") REFERENCES "Stores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "GroupProductStorePrices" ADD CONSTRAINT "FK_022edc168c26484aa01d3c032e2" FOREIGN KEY ("groupProductId") REFERENCES "GroupProducts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "GroupProductStorePrices" DROP CONSTRAINT "FK_022edc168c26484aa01d3c032e2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "GroupProductStorePrices" DROP CONSTRAINT "FK_8106bfb6a6d07a3a0c0270c6807"`,
    );
    await queryRunner.query(
      `ALTER TABLE "GroupProducts" DROP CONSTRAINT "FK_e28f88545231e30ea1091241df6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "GroupProducts" DROP CONSTRAINT "FK_d8b0c5d135e7735bbe4449ee81f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "ProductGroups" DROP CONSTRAINT "FK_7debff572a77c665e3ca780fa70"`,
    );
    await queryRunner.query(`DROP TABLE "GroupProductStorePrices"`);
    await queryRunner.query(`DROP TABLE "Stores"`);
    await queryRunner.query(`DROP TABLE "GroupProducts"`);
    await queryRunner.query(`DROP TABLE "Products"`);
    await queryRunner.query(`DROP TABLE "ProductGroups"`);
    await queryRunner.query(`DROP TABLE "Users"`);
  }
}
