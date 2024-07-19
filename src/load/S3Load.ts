import { Load } from './Load';
import { S3 } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage'; // Import the AwsCredentialIdentity type

export interface S3LoadProps {
  accessKeyId?: string;
  secretAccessKey?: string;
  region: string;
}

export interface S3LoadSaveProps {
  filename: string;
  data: any[];
}

export default class S3Load implements Load {
  public s3: S3;

  constructor(
    private props: S3LoadProps,
    private bucket: string
  ) {
    const credentials =
      this.props.accessKeyId && this.props.secretAccessKey
        ? {
            accessKeyId: this.props.accessKeyId,
            secretAccessKey: this.props.secretAccessKey,
          }
        : undefined;

    this.s3 = new S3({
      region: this.props.region,
      credentials,
    });
  }

  async save(props: S3LoadSaveProps) {
    const params = {
      Bucket: this.bucket,
      Key: props.filename,
      Body: JSON.stringify(props.data),
    };

    const upload = new Upload({
      client: this.s3,
      params: params,
    });

    return upload.done();
  }
}
