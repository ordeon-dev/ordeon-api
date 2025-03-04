export class Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  type: boolean;

  orgId: number;

  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<Product>) {
    Object.assign(this, partial);
  }
}
