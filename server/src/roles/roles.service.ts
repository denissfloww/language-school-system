import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../models/user.entity';
import { Repository } from 'typeorm';
import { Role } from '../models/role.entity';

@Injectable()
export class RolesService {
  constructor() {}
}
