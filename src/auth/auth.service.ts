import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { UserService } from 'src/services/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from 'src/dto/user/register-user.dto';
import { PrismaService } from 'prisma/prisma.service';
import { group } from 'console';
import { RequestContext } from 'src/utils/request-context';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async loginWithEmail(
    email: string,
    pass: string,
  ): Promise<{ access_token: string; user: Omit<User, 'password'> } | null> {
    const user = await this.userService.findUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException({
        message: 'Dados Incorretos..',
      });
    }

    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      throw new UnauthorizedException({
        message: 'Dados Incorretos..',
      });
    }

    const groupPermissions = await this.prisma.userGroup.findUnique({
      where: {
        userId: user.id,
      },
      include: {
        group: {
          include: {
            permissionGroup: {
              include: {
                permission: true,
              },
            },
          },
        },
      },
    });

    let permissions = [];

    if (groupPermissions) {
      permissions = groupPermissions.group.permissionGroup
        .map((permissionGroup) => {
          return permissionGroup.permission.guardName;
        })
        .flat();
    } else {
      permissions = [];
    }

    let group = {};

    if (user?.userGroup?.group?.id) {
      group = user.userGroup.group;
    } else {
      group = {};
    }

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      group: group,
      permissions: permissions,
    };

    const { password, userGroup, ...userWithoutPassword } = user;

    userWithoutPassword.permissions = permissions;
    userWithoutPassword.group = group;

    return {
      access_token: await this.jwtService.signAsync(payload),
      user: userWithoutPassword,
    };
  }

  async register(registerUserDto: RegisterUserDto): Promise<{
    access_token: string;
    user: Omit<User, 'password'>;
    message: string;
  } | null> {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: registerUserDto.email },
    });

    if (existingUser) {
      throw new BadRequestException(`Este e-mail já está em uso.`);
    }

    const hashedPassword = await bcrypt.hash(registerUserDto.password, 10);

    const createUser = await this.prisma.user.create({
      data: {
        ...registerUserDto,
        password: hashedPassword,
      },
    });

    if (!createUser) {
      throw new BadRequestException('Erro ao criar conta..!');
    }

    const payload = {
      id: createUser.id,
      name: createUser.name,
      email: createUser.email,
    };

    const { password, ...userWithoutPassword } = createUser;

    const access_token = await this.jwtService.signAsync(payload);

    return {
      access_token,
      user: userWithoutPassword,
      message: 'Cadastro realizado com sucesso!!',
    };
  }

  async completeSetup(user_id: number, organization_id: number) {
    const group = await this.prisma.group.create({
      data: {
        name: 'Administrador',
        orgId: organization_id,
      },
    });

    const groupPermissions = [
      {
        moduleId: 1,
        permissionId: 4,
        groupId: group.id,
      },
      {
        moduleId: 2,
        permissionId: 8,
        groupId: group.id,
      },
      {
        moduleId: 3,
        permissionId: 12,
        groupId: group.id,
      },
      {
        moduleId: 4,
        permissionId: 16,
        groupId: group.id,
      },
      {
        moduleId: 5,
        permissionId: 20,
        groupId: group.id,
      },
      {
        moduleId: 6,
        permissionId: 24,
        groupId: group.id,
      },
    ];

    const insertPermissions = await this.prisma.permissionGroup.createMany({
      data: groupPermissions,
    });

    const insertUserGroup = await this.prisma.userGroup.create({
      data: {
        userId: user_id,
        groupId: group.id,
      },
    });

    return {
      message: 'Configurações realizadas com sucesso!!',
    };
  }
}
