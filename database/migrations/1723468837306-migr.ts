import { MigrationInterface, QueryRunner } from "typeorm";

export class Migr1723468837306 implements MigrationInterface {
    name = 'Migr1723468837306'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "price" numeric NOT NULL, "release_date" TIMESTAMP NOT NULL, "stock_quantity" integer NOT NULL, "type" character varying NOT NULL, "model" character varying, "color" character varying, "battery_life" integer, "storage_capacity" character varying, "processor" character varying, "operating_system" character varying, "ram" character varying, "screenSize" character varying, "wireless" boolean, "noise_cancelling" boolean, "connectivity" character varying, "screen_size" character varying, "resolution" character varying, "refresh_rate" integer, "port_types" character varying, "camera_resolution" character varying, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a8bac1a8730c8d04310d8093fc" ON "product" ("type") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_a8bac1a8730c8d04310d8093fc"`);
        await queryRunner.query(`DROP TABLE "product"`);
    }

}
