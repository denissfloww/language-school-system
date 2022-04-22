import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedCost1650548245476 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const cost = {
      name: 'Стандарт',
      lessonPrice: 500,
    };

    if (process.env.NODE_ENV !== 'production') {
      await queryRunner.query(
        `INSERT INTO "costs" (name, lesson_price) VALUES ('${cost.name}', '${cost.lessonPrice}') `,
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
