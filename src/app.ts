import { Extract } from './extract/Extract';
import { Transfer } from './transfer/Transfer';
import { Load } from './load/Load';

export class ETL {
  constructor(private extract: Extract, private transfer: Transfer, private load: Load) {}

  async run() {
    const data = await this.extract.read();
    const transformedData = await this.transfer.transform(data);
    await this.load.save(transformedData);
    
    return transformedData;
  }
}