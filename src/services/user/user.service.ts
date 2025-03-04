import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'prisma/prisma.service';
import { CreateUserDto } from 'src/dto/user/create-user.dto';
import { UpdateUserDto } from 'src/dto/user/update-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async findAll(organization_id: number): Promise<Omit<User, 'password'>[]> {
    const users = await this.prisma.user.findMany({
      include: {
        userOrganization: {
          where: {
            orgId: organization_id,
          },
        },
      },
    });

    return users.map((user) => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
  }

  async findOne(
    id: number,
    organization_id: number,
  ): Promise<Omit<User, 'password'> | { message: string }> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        userOrganization: {
          where: {
            orgId: organization_id,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException(`Usuário não encontrado..`);
    }

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async findUserByEmail(email: string): Promise<any | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: {
        userGroup: {
          include: {
            group: true,
          },
        },
      },
    });

    if (!user) return null;

    return user;
  }

  async create(createUserDto: CreateUserDto, organization_id: number) {
    const user = await this.prisma.user.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        password: await bcrypt.hash(createUserDto.password, 10),
      },
    });

    const userOrganization = await this.prisma.userOrganization.create({
      data: {
        userId: user.id,
        orgId: organization_id,
      },
    });

    const userGroup = await this.prisma.userGroup.createMany({
      data: createUserDto.groups.map((groupId) => ({
        userId: user.id,
        groupId,
      })),
    });

    return {
      messssage: 'Usuário criado com sucesso!',
      user,
    };
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
    organization_id: number,
  ) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        userOrganization: {
          where: {
            orgId: organization_id,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException(`Usuário não encontrado.`);
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        name: updateUserDto.name,
        email: updateUserDto.email,
        password: await bcrypt.hash(updateUserDto.password, 10),
      },
    });

    return updatedUser;
  }
}
