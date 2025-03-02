import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class Seeder {
  constructor(private readonly prisma: PrismaService) {}

  async seed() {
    
    
    const modules = [
      { name: 'Usuários',
        description: 'Módulo de Usuários',
      },
      {
        name: 'Grupos',
        description: 'Módulo de Grupos',
      },
      {
        name: 'Ordens de Serviço',
        description: 'Módulo de Ordens de Serviço',
      },
      {
        name: 'Produtos',
        description: 'Módulo de Produtos',
      },
      {
        name: 'Clientes',
        description: 'Módulo de Clientes',
      },
      {
        name: 'Veículos',
        description: 'Módulo de Veículos',
      }
    ];
    
    await this.prisma.module.createMany({
      data: modules,
    });
    
    // orders statuses
    
    const orderStatuses = [
      { name: 'Pendente' },
      { name: 'Confirmado' },
      { name: 'Pago' },
      { name: 'Cancelado' },
    ];
    
    await this.prisma.orderStatus.createMany({
      data: orderStatuses,
    });
    
    // permissions
    
    const userPermisisons = [
      {
        name: 'Visualizar Usuários',
        guardName: 'read_users',
      },
      {
        name: 'Criar Usuários',
        guardName: 'create_users',
      },
      {
        name: 'Atualizar Usuários',
        guardName: 'update_users',
      },
      {
        name: 'Deletar Usuários',
        guardName: 'delete_users',
      }
    ];
    
    const groupPermissioons = [
      {
        name: 'Visualizar Grupos',
        guardName: 'read_groups',
      },
      {
        name: 'Criar Grupos',
        guardName: 'create_groups',
      },
      {
        name: 'Atualizar Grupos',
        guardName: 'update_groups',
      },
      {
        name: 'Deletar Grupos',
        guardName: 'delete_groups',
      }
    ]
    
    const orderPermissions = [
      {
        name: 'Visualizar OS',
        guardName: 'read_orders',
      },
      {
        name: 'Criar OS',
        guardName: 'create_orders',
      },
      {
        name: 'Atualizar OS',
        guardName: 'update_orders',
      },
      {
        name: 'Deletar OS',
        guardName: 'delete_orders',
      }
    ];
    
    const productPermissions = [
      {
        name: 'Visualizar Produtos',
        guardName: 'read_products',
      },
      {
        name: 'Criar Produtos',
        guardName: 'create_products',
      },
      {
        name: 'Atualizar Produtos',
        guardName: 'update_products',
      },
      {
        name: 'Deletar Produtos',
        guardName: 'delete_products',
      }
    ];
    
    const clientPermissions = [
      {
        name: 'Visualizar Clientes',
        guardName: 'read_clients',
      },
      {
        name: 'Criar Clientes',
        guardName: 'create_clients',
      },
      {
        name: 'Atualizar Clientes',
        guardName: 'update_clients',
      },
      {
        name: 'Deletar Clientes',
        guardName: 'delete_clients',
      }
    ];
    
    const vehiclePermissions = [
      {
        name: 'Visualizar Veículos',
        guardName: 'read_vehicles',
      },
      {
        name: 'Criar Veículos',
        guardName: 'create_vehicles',
      },
      {
        name: 'Atualizar Veículos',
        guardName: 'update_vehicles',
      },
      {
        name: 'Deletar Veículos',
        guardName: 'delete_vehicles',
      }
    ];

    await this.prisma.permission.createMany({
      data: [
        ...userPermisisons,
        ...groupPermissioons,
        ...orderPermissions,
        ...productPermissions,
        ...clientPermissions,
        ...vehiclePermissions,
      ],
    });
    
    console.log('Database seeded successfully!');
  }
}