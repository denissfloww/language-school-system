import { MigrationInterface, QueryRunner } from 'typeorm';

export class CostsStudentsGroups1660151179990 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            create table costs_students_groups
(
    created_at timestamp default now() not null,
    updated_at timestamp default now() not null,
    id         serial
        constraint "PK_09b980938256a0f7874f73ba744"
            primary key,
    group_id   integer                 not null
        constraint "FK_fc31576110d149e8523e8e5fa60"
            references groups,
    student_id integer                 not null
        constraint "FK_ec940382693728eabb17bb5594a"
            references students,
    cost_id integer                 not null
        constraint "FK_ecostsbb17bb5594a"
            references costs,
    deleted_at timestamp
);


        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('costs_students_groups');
  }
}
