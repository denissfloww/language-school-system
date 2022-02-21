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
           firstName   varchar                 not null,
           lastName   varchar                 not null,
           middleName   varchar                 ,
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
