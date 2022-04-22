import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedLanguages1650194033750 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const language = {
      name: 'Английский язык',
    };

    await queryRunner.query(
      `INSERT INTO "languages" (name) VALUES ('${language.name}') `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
