import { MigrationInterface, QueryRunner } from 'typeorm';
import { RolesEnum } from '../auth/roles.enum';

export class SeedLessonTypes1648398786956 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const LessonTypesSeed = [
      {
        name: 'Плановое занятие',
        description: 'Самое обычное занятие.',
      },
      {
        name: 'Тренинг',
        description: 'Проводится несколько раз в месяц.',
      },
    ];

    LessonTypesSeed.map(async (type) => {
      await queryRunner.query(
        `INSERT INTO "lesson_types" (name, description, "updatedAt", "createdAt") VALUES ('${type.name}', '${type.description}', now(), now()) `,
      );
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
