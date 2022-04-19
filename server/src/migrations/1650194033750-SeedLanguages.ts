import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedLanguages1650194033750 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const Language = {
      name: 'Английский язык',
    };

    await queryRunner.query(
      `INSERT INTO "languages" (name) VALUES ('${Language.name}') `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
