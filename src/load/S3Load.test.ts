import S3Load from './S3Load';

describe('S3Load', () => {
  let s3Load: S3Load;

  beforeEach(() => {
    // Initialize S3Load instance with mock props and bucket
    const bucket = process.env['S3_LOAD_BUCKET'] || 'metaclub-log';
    s3Load = new S3Load({
      accessKeyId: process.env['S3_LOAD_ACCESS_KEY_ID'],
      secretAccessKey: process.env['S3_LOAD_SECRET_ACCESS_KEY'],
      region: process.env['S3_LOAD_REGION'] || 'ap-northeast-2',
    }, bucket);
  });

  it('should save data to S3 bucket', async () => {
    // Mock save props
    const saveProps = {
      filename: 'data.json',
      data: [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }],
    };

    // Call the save method
    const result = await s3Load.save(saveProps);
    console.log(result);
  });
});