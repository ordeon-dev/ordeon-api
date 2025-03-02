import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { User } from './decorators/Index.decorator';
import { RequestContext } from 'src/utils/request-context';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    const user_id = parseInt(RequestContext.get('user_id'));
    const organization_id = parseInt(RequestContext.get('organization_id'));
    
    return this.userService.findAll(organization_id);
  }
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    const user_id = parseInt(RequestContext.get('user_id'));
    const organization_id = parseInt(RequestContext.get('organization_id'));
    
    return this.userService.findOne(+id,  organization_id);;
  }
  
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    const user_id = parseInt(RequestContext.get('user_id'));
    const organization_id = parseInt(RequestContext.get('organization_id'));

    return this.userService.create(createUserDto, organization_id);
  }
}
