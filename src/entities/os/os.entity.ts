export class Os {
  id: number;
  clientId: number;
  statusId: number;
  orgId: number;
  orderProduct: OrderProduct[];
  orderVehicle: OrderVehicle[];

  constructor(partial: Partial<Os>) {
    Object.assign(this, partial);
  }
}

export class OrderProduct {
  productId: number;
  show: boolean;
  quantity: number;
}

export class OrderVehicle {
  vehicleId: number;
}
