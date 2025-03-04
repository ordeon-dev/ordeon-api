import { Injectable } from '@nestjs/common';
import { CreateModuleDto } from 'src/dto/module/create-module.dto';
import { UpdateModuleDto } from 'src/dto/module/update-module.dto';

@Injectable()
export class ModuleService {
  create(createModuleDto: CreateModuleDto) {
    return 'This action adds a new module';
  }

  findAll() {
    return `This action returns all module`;
  }

  findOne(id: number) {
    return `This action returns a #${id} module`;
  }

  update(id: number, updateModuleDto: UpdateModuleDto) {
    return `This action updates a #${id} module`;
  }

  remove(id: number) {
    return `This action removes a #${id} module`;
  }
}
