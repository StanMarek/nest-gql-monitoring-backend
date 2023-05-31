import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/users/entities/user.entity';

export const ROLE_KEY = 'role';
export const AllowRole = (role: Role) => SetMetadata(ROLE_KEY, role);
