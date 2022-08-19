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
            name: 'short_name',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'parent_name',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'parent_middle_name',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'parent_last_name',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'parent_email',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'parent_phone',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: "timezone('utc'::text, now())",
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: "timezone('utc'::text, now())",
            isNullable: false,
          },
          {
            name: 'deleted_at',
            type: 'timestamp with time zone',
            isNullable: true,
          },
        ],
      }),
      true,
    );

    await queryRunner.addColumn(
      'students',
      new TableColumn({
        name: 'user_id',
        type: 'int',
      }),
    );

    await queryRunner.createForeignKey(
      'students',
      new TableForeignKey({
        columnNames: ['user_id'],
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
