import { Extract } from './Extract';

export class MySQLExtract implements Extract {
  constructor() {}

  async read() {
    return 'MySQL data';
  }
}
