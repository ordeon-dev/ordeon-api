export class Client {
  id: string;
  name: string;
  cpf_cnpj: string;
  rg: string;
  cnh: string;
  status: boolean;
  orgId: number;

  clientVehicle: ClientVehicle[];

  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<Client>) {
    Object.assign(this, partial);
  }
}

export class ClientVehicle {
  clientId: number;
  name: string;
  plate: string;
  document: string;
}
