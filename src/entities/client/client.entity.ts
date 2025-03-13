export class Client {
  id: string;
  name: string;
  cpf_cnpj: string;
  rg: string;
  cnh: string;
  status: boolean;
  orgId: number;

  clientVehicle: ClientVehicle[];
  clientContact: ClientContact[];

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

  constructor(partial: Partial<ClientVehicle>) {
    Object.assign(this, partial);
  }
}

export class ClientContact {
  clientId: number;
  contactName: string;
  phone: string[];
  email: string;

  constructor(partial: Partial<ClientContact>) {
    Object.assign(this, partial);
  }
}
