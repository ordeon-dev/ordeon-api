import { Injectable } from '@nestjs/common';
import { Seeder } from 'src/command/seeder';

@Injectable()
export class CommandService {
  constructor(private readonly seeder: Seeder) {}

  async runSeeder() {
    await this.seeder.seed();
  }
}
