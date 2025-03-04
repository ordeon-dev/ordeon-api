export class Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;

  constructor(partial: Partial<Client>) {
    Object.assign(this, partial);
  }
}
