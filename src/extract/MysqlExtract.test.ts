import MysqlExtract, {
  MySQLExtractDataSource,
} from './MysqlExtract';

import 'dotenv/config';

describe.only('MysqlExtract', () => {
  const dataSource: MySQLExtractDataSource = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'admin',
    password: process.env.DB_PASSWORD || 'password',
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
    database: process.env.DB_NAME || 'my_database',
    waitForConnections: true,
    connectionLimit: 10,
    idleTimeout: 10000,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
  };

  let mysqlExtract: MysqlExtract;
  const sql = `
    SELECT *
      FROM MF_MEMBER_ACTION_HISTORY
    INNER JOIN MF_MEMBER
      ON MF_MEMBER_ACTION_HISTORY.MEMBER_SEQ = MF_MEMBER.MEMBER_SEQ
    WHERE MEMBER_ACTION_HISTORY_SEQ = 162525417;`;

  beforeEach(() => {
    // Initialize the MysqlExtract instance
    mysqlExtract = new MysqlExtract(dataSource);
  });

  afterEach(() => {
    // Clean up any resources used by MysqlExtract
    // (e.g., close database connections)
    // mysqlExtract.close();
  });

  it('should extract data from MySQL database', async () => {
    // Test your extraction logic here
    // For example, you can call a method on mysqlExtract
    // and assert the expected results using Jest's expect function
    const rows = await mysqlExtract.extractData(sql);
    expect(rows).toBeDefined();
    expect(rows.length).toBeGreaterThan(0);
  });
});
