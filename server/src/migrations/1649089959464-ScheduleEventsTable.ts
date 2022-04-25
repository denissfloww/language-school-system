import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class ScheduleEventsTable1649089959464 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'schedule_events',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'event_data',
            type: 'json',
          },
          {
            name: 'event_id',
            type: 'int',
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
      'schedule_events',
      new TableColumn({
        name: 'group_id',
        type: 'int',
      }),
    );

    await queryRunner.createForeignKey(
      'schedule_events',
      new TableForeignKey({
        columnNames: ['group_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'groups',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('schedule_events');
  }
}
