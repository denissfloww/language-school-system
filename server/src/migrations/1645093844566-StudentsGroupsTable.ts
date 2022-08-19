import { MigrationInterface, QueryRunner } from 'typeorm';

export class StudentsGroupsTable1645093844566 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      create table students_groups_groups
        (
            "student_id" integer not null
                constraint "FK_97fb33bee4c990b82cf307f1f6e"
                    references students
                    on update cascade on delete cascade,
            "group_id"   integer not null
                constraint "FK_c63201d55115ec4f63844060c4d"
                    references groups
                    on update cascade on delete cascade,
            constraint "PK_bd2797817e486d3769f415a7eb1"
                primary key ("student_id", "group_id")
        );



        create index "IDX_97fb33bee4c990b82cf307f1f6"
            on students_groups_groups ("student_id");
        
        create index "IDX_c63201d55115ec4f63844060c4"
            on students_groups_groups ("group_id");
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('students_groups_groups');
  }
}
