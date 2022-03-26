import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';
import { RolesEnum } from '../auth/roles.enum';

export class RolesTable1644750609354 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'roles',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'label',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()',
            isNullable: false,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
            isNullable: false,
          },
        ],
      }),
      true,
    );

    await queryRunner.createIndex(
      'roles',
      new TableIndex({
        name: 'IDX_ROLES_NAME',
        columnNames: ['name'],
      }),
    );

    // await queryRunner.query(
    //   `INSERT INTO roles VALUES (1,${RolesEnum.Student}, 'Студент', 'Роль студента', now(), now()) `,
    // );

    // await queryRunner.query(
    //   `INSERT INTO roles VALUES ('',${RolesEnum.Admin}, 'Администратор', 'Роль администратора', now(), now()) `,
    // );
    //
    // await queryRunner.query(
    //   `INSERT INTO roles VALUES ('',${RolesEnum.Teacher}, 'Учитель', 'Роль учителя', now(), now()) `,
    // );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('roles');
  }
}
