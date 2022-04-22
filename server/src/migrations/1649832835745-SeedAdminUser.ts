import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcryptjs';

export class SeedAdminUser1649832835745 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const hashPassword = await bcrypt.hash('admin', 5);
    const adminSeed = {
      login: 'Admin',
      password: hashPassword,
      firstName: 'Администратор',
      lastName: 'Системы',
    };

    await queryRunner.query(
      `INSERT INTO "users" (login, password, first_name, last_name, birth_date) VALUES ('${adminSeed.login}', '${adminSeed.password}','${adminSeed.firstName}','${adminSeed.lastName}', '1999-01-08' ) `,
    );

    await queryRunner.query(
      `INSERT INTO "user_role" (user_id, role_id) VALUES ('1','2') `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
