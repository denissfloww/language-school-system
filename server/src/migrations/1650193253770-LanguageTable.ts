import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

export class LanguageTable1650193253770 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'languages',
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
            name: 'description',
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

    await queryRunner.createIndex(
      'languages',
      new TableIndex({
        name: 'IDX_LANGUAGE_NAME',
        columnNames: ['name'],
      }),
    );

    await queryRunner.addColumn(
      'groups',
      new TableColumn({
        name: 'language_id',
        type: 'int',
      }),
    );

    await queryRunner.createForeignKey(
      'groups',
      new TableForeignKey({
        columnNames: ['language_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'languages',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('languages');
  }
}
