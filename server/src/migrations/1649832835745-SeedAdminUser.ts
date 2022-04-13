import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcryptjs';

export class SeedAdminUser1649832835745 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const hashPassword = await bcrypt.hash('admin', 5);
    const AdminSeed = {
      login: 'Admin',
      password: hashPassword,
      firstName: 'Администратор',
      lastName: 'Системы',
    };

    await queryRunner.query(
      `INSERT INTO "users" (login, password, first_name, last_name) VALUES ('${AdminSeed.login}', '${AdminSeed.password}','${AdminSeed.firstName}','${AdminSeed.lastName}' ) `,
    );

    await queryRunner.query(
        `INSERT INTO "user_role" (user_id, role_id) VALUES ('1','2') `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
