import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class StudentsGroupsTable1645093844566 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'student_group',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
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

    await queryRunner.addColumn(
      'student_group',
      new TableColumn({
        name: 'userId',
        type: 'int',
      }),
    );
    await queryRunner.addColumn(
      'student_group',
      new TableColumn({
        name: 'groupId',
        type: 'int',
      }),
    );

    await queryRunner.createForeignKey(
      'student_group',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'student_group',
      new TableForeignKey({
        columnNames: ['groupId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'groups',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('student_group');
  }
}
