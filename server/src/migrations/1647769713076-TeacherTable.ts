import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class TeacherTable1647769713076 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'teachers',
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
        ],
      }),
      true,
    );

    await queryRunner.addColumn(
      'teachers',
      new TableColumn({
        name: 'user_id',
        type: 'int',
      }),
    );

    await queryRunner.createForeignKey(
      'teachers',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.addColumn(
      'groups',
      new TableColumn({
        name: 'teacher_id',
        type: 'int',
      }),
    );

    await queryRunner.createForeignKey(
      'groups',
      new TableForeignKey({
        columnNames: ['teacher_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'teachers',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('teachers');
  }
}
