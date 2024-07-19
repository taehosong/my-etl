import { Extract } from './Extract';
import { S3 } from '@aws-sdk/client-s3';

export interface S3ExtractDataSource {
  accessKeyId?: string;
  secretAccessKey?: string;
  region: string;
  bucket: string;
}

export default class S3Extract implements Extract {
  public s3: S3;

  constructor(
    private dataSource: S3ExtractDataSource,
  ) {
    const credentials =
      this.dataSource.accessKeyId && this.dataSource.secretAccessKey
        ? {
            accessKeyId: this.dataSource.accessKeyId,
            secretAccessKey: this.dataSource.secretAccessKey,
          }
        : undefined;

    this.s3 = new S3({
      region: this.dataSource.region,
      credentials,
    });
  }

  async extractData(key: string) {
    const params = {
      Bucket: this.dataSource.bucket,
      Key: key,
    };

    const data = await this.s3.getObject(params);
    return data.Body?.transformToString();
  }
}
