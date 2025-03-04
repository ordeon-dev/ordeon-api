export class Vehicle {
  id: number;
  name: string;
  plate: string;
  document: string;

  clientId: number;

  constructor(partial: Partial<Vehicle>) {
    Object.assign(this, partial);
  }
}
