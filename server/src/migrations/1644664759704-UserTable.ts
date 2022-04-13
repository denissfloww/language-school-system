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
           first_name    varchar                 not null,
           last_name     varchar                 not null,
           middle_name   varchar                 ,
           phone        varchar                 ,
           email        varchar                 ,
           updated_at timestamp default now() not null,
           created_at timestamp default now() not null
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
