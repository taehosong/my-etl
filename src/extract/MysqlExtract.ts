import { Extract } from './Extract';
import mysql, { PoolOptions, RowDataPacket } from 'mysql2/promise';

export type MySQLExtractDataSource = PoolOptions;
type SQL = string;

export default class MySQLExtract implements Extract {
  constructor(
    private dataSource: MySQLExtractDataSource,
  ) {}

  async extractData(sql: string) {
    const connection = await mysql.createConnection(
      this.dataSource
    );

    const [rows, fields] = await connection.query<RowDataPacket[]>(
      {
        sql: sql,
        nestTables: true
      }
    );

    connection.end();

    return rows;
  }
}
