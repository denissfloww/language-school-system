import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserRoleTable1644750641109 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`create table users_roles_roles
    (
    role_id integer not null
        constraint "FK_38703d4da3789a6ad8552ba783e"
            references roles
            on update cascade on delete cascade,
    user_id integer not null
        constraint "FK_32e5adf0a2e33e130de343c6ee8"
            references users
            on update cascade on delete cascade,
    constraint "PK_4f5382a23fff88b69c0767b700d"
        primary key (role_id, user_id)
    );

    create index "IDX_38703d4da3789a6ad8552ba783"
        on users_roles_roles (role_id);
    
    create index "IDX_32e5adf0a2e33e130de343c6ee"
        on users_roles_roles (user_id);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users_roles_roles');
  }
}
