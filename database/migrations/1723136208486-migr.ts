import { MigrationInterface, QueryRunner } from "typeorm";

export class Migr1723136208486 implements MigrationInterface {
    name = 'Migr1723136208486'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying NOT NULL, "name" character varying, "surname" character varying, "fathers_name" character varying, "gender" character varying, "phone" integer, "birthday" TIMESTAMP, "email_send_accept" boolean NOT NULL DEFAULT false, "sms_send_accept" boolean NOT NULL DEFAULT false, "address_type" character varying, "city" character varying, "street" character varying, "house" integer, "building" integer, "apartment" integer, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
