import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../models/role.entity';
import { RolesEnum } from '../auth/roles.enum';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
  ) {}

  async getRoles() {
    return this.rolesRepository.find();
  }

  async getRolesByEnumArray(enumRoles: RolesEnum[]) {
    const roles: Role[] = [];
    for (const roleName of enumRoles) {
      const role = await this.rolesRepository.findOne({
        where: { name: roleName },
      });

      roles.push(role);
    }

    return roles;
  }
}
