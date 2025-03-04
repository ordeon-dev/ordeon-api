export class Client {
  id: string;
  name: string;
  cpf_cnpj: string;
  rg: string;
  cnh: string;
  status: boolean;
  orgId: number;

  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<Client>) {
    Object.assign(this, partial);
  }
}
