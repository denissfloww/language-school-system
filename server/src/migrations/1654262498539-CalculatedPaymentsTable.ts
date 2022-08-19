import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class CalculatedPaymentsTable1654262498539
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'calculated_payments',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'payment_sum',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'calculation_month',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'calculation_date',
            type: 'timestamp with time zone',
            default: "timezone('utc'::text, now())",
            isNullable: false,
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
      'calculated_payments',
      new TableColumn({
        name: 'student_id',
        type: 'int',
      }),
    );

    await queryRunner.createForeignKey(
      'calculated_payments',
      new TableForeignKey({
        columnNames: ['student_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'students',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.addColumn(
      'calculated_payments',
      new TableColumn({
        name: 'group_id',
        type: 'int',
      }),
    );

    await queryRunner.createForeignKey(
      'calculated_payments',
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
    await queryRunner.dropTable('calculated_payments');
  }
}
