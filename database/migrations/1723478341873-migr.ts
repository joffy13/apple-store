import { MigrationInterface, QueryRunner } from "typeorm";

export class Migr1723478341873 implements MigrationInterface {
    name = 'Migr1723478341873'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_23e1268d34c17d8c6604634c2f3"`);
        await queryRunner.query(`CREATE TABLE "product_specification" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "model" character varying, "storage_capacity" character varying, "color" character varying, "screen_size" character varying, "battery_life" integer, "camera_resolution" character varying, "processor" character varying, "operating_system" character varying, "wireless" boolean, "noise_cancelling" boolean, "resolution" character varying, "refresh_rate" integer, "port_types" character varying, "ram" character varying, "connectivity" character varying, CONSTRAINT "PK_b704b6c0f092cc7edc63d33088b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "PK_bebc9158e480b949565b4dc7a82"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "UQ_23e1268d34c17d8c6604634c2f3"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "specificationsId"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "specificationsId" uuid`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "UQ_23e1268d34c17d8c6604634c2f3" UNIQUE ("specificationsId")`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_23e1268d34c17d8c6604634c2f3" FOREIGN KEY ("specificationsId") REFERENCES "product_specification"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_23e1268d34c17d8c6604634c2f3"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "UQ_23e1268d34c17d8c6604634c2f3"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "specificationsId"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "specificationsId" integer`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "UQ_23e1268d34c17d8c6604634c2f3" UNIQUE ("specificationsId")`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "PK_bebc9158e480b949565b4dc7a82"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id")`);
        await queryRunner.query(`DROP TABLE "product_specification"`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_23e1268d34c17d8c6604634c2f3" FOREIGN KEY ("specificationsId") REFERENCES "specifications"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
