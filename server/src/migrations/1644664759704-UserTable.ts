import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserTable1644664759704 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `create table users
       (
           id          serial
               constraint users_pk
                   primary key,
           login       varchar                 not null,
           password    varchar                 not null,
           full_name   varchar                 not null,
           "updatedAt" timestamp default now() not null,
           "createdAt" timestamp default now() not null
       );

      `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE users`);
  }
}
