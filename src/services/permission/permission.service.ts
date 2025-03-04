import { Injectable } from '@nestjs/common';
import { CreatePermissionDto } from 'src/dto/permission/create-permission.dto';
import { UpdatePermissionDto } from 'src/dto/permission/update-permission.dto';

@Injectable()
export class PermissionService {
  create(createPermissionDto: CreatePermissionDto) {
    return 'This action adds a new permission';
  }

  findAll() {
    return `This action returns all permission`;
  }

  findOne(id: number) {
    return `This action returns a #${id} permission`;
  }

  update(id: number, updatePermissionDto: UpdatePermissionDto) {
    return `This action updates a #${id} permission`;
  }

  remove(id: number) {
    return `This action removes a #${id} permission`;
  }
}
