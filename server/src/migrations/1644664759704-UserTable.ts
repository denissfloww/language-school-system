import { MigrationInterface, QueryRunner, TableIndex } from 'typeorm';

export class UserTable1644664759704 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `create table users
       (
           id          serial
               constraint users_pk
                   primary key,
           login        varchar                 not null,
           password     varchar                 not null,
           firstName    varchar                 not null,
           lastName     varchar                 not null,
           middleName   varchar                 ,
           phone        varchar                 ,
           email        varchar                 ,
           "updatedAt" timestamp default now() not null,
           "createdAt" timestamp default now() not null
       );

      `,
    );

    await queryRunner.createIndex(
      'users',
      new TableIndex({
        name: 'IDX_USERS_LOGIN',
        columnNames: ['login'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE users`);
  }
}
