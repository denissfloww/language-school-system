import { MigrationInterface, QueryRunner } from 'typeorm';
import { RolesEnum } from '../auth/roles.enum';

export class SeedRoles1647672680951 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const RolesSeed = [
      {
        name: RolesEnum.Student,
        label: 'Студент',
        description: 'Роль студента',
      },
      {
        name: RolesEnum.Admin,
        label: 'Администратор',
        description: 'Роль администратора (более широкие возможности)',
      },
      {
        name: RolesEnum.Teacher,
        label: 'Учитель',
        description: 'Роль Учителя',
      },
    ];

    RolesSeed.map(async (role) => {
      await queryRunner.query(
        `INSERT INTO "roles" (name, label, description) VALUES ('${role.name}', '${role.label}', '${role.description}') `,
      );
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
