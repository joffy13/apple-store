import { MigrationInterface, QueryRunner } from "typeorm";

export class Migr1723477371092 implements MigrationInterface {
    name = 'Migr1723477371092'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_a8bac1a8730c8d04310d8093fc"`);
        await queryRunner.query(`CREATE TABLE "specifications" ("id" SERIAL NOT NULL, "model" character varying, "storage_capacity" character varying, "color" character varying, "screen_size" character varying, "battery_life" integer, "camera_resolution" character varying, "processor" character varying, "operating_system" character varying, "wireless" boolean, "noise_cancelling" boolean, "resolution" character varying, "refresh_rate" integer, "port_types" character varying, "ram" character varying, "connectivity" character varying, CONSTRAINT "PK_621aabf71e640ab86f0e8b62a37" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "model"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "color"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "battery_life"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "storage_capacity"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "processor"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "operating_system"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "ram"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "screenSize"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "wireless"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "noise_cancelling"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "connectivity"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "screen_size"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "resolution"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "refresh_rate"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "port_types"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "camera_resolution"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "specificationsId" integer`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "UQ_23e1268d34c17d8c6604634c2f3" UNIQUE ("specificationsId")`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "email" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "PK_bebc9158e480b949565b4dc7a82"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "price" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_23e1268d34c17d8c6604634c2f3" FOREIGN KEY ("specificationsId") REFERENCES "specifications"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_23e1268d34c17d8c6604634c2f3"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "price" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "PK_bebc9158e480b949565b4dc7a82"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "email" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "UQ_23e1268d34c17d8c6604634c2f3"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "specificationsId"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "camera_resolution" character varying`);
        await queryRunner.query(`ALTER TABLE "product" ADD "port_types" character varying`);
        await queryRunner.query(`ALTER TABLE "product" ADD "refresh_rate" integer`);
        await queryRunner.query(`ALTER TABLE "product" ADD "resolution" character varying`);
        await queryRunner.query(`ALTER TABLE "product" ADD "screen_size" character varying`);
        await queryRunner.query(`ALTER TABLE "product" ADD "connectivity" character varying`);
        await queryRunner.query(`ALTER TABLE "product" ADD "noise_cancelling" boolean`);
        await queryRunner.query(`ALTER TABLE "product" ADD "wireless" boolean`);
        await queryRunner.query(`ALTER TABLE "product" ADD "screenSize" character varying`);
        await queryRunner.query(`ALTER TABLE "product" ADD "ram" character varying`);
        await queryRunner.query(`ALTER TABLE "product" ADD "operating_system" character varying`);
        await queryRunner.query(`ALTER TABLE "product" ADD "processor" character varying`);
        await queryRunner.query(`ALTER TABLE "product" ADD "storage_capacity" character varying`);
        await queryRunner.query(`ALTER TABLE "product" ADD "battery_life" integer`);
        await queryRunner.query(`ALTER TABLE "product" ADD "color" character varying`);
        await queryRunner.query(`ALTER TABLE "product" ADD "model" character varying`);
        await queryRunner.query(`DROP TABLE "specifications"`);
        await queryRunner.query(`CREATE INDEX "IDX_a8bac1a8730c8d04310d8093fc" ON "product" ("type") `);
    }

}
