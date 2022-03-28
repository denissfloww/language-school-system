import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedLessonTypes1648398786956 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const LessonTypesSeed = [
      {
        name: 'Плановое занятие',
        description: 'Самое обычное занятие.',
        color: '#36b060',
      },
      {
        name: 'Тренинг',
        description: 'Проводится несколько раз в месяц.',
        color: '#7a3636',
      },
    ];

    LessonTypesSeed.map(async (type) => {
      await queryRunner.query(
        `INSERT INTO "lesson_types" (name, description, color, "updatedAt", "createdAt") VALUES ('${type.name}', '${type.description}','${type.color}', now(), now()) `,
      );
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
