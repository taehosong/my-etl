export interface Extract {
  extractData(sql: string): Promise<any>;
}