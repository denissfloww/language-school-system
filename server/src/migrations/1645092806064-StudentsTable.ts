import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class StudentsTable1645092806064 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'students',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'firstName',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'middleName',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'lastName',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'shortName',
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

    await queryRunner.addColumn(
      'students',
      new TableColumn({
        name: 'userId',
        type: 'int',
      }),
    );

    await queryRunner.createForeignKey(
      'students',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('students');
  }
}
