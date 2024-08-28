import { PassThrough } from 'stream';
import cloudinary from './index';

export async function saveCloudStorageDoc(
  buffer: Buffer,
  userEmail: string,
): Promise<any> {
  return new Promise((resolve, reject) => {
    const cldUploadStream = cloudinary.v2.uploader.upload_stream(
      {
        folder: `Picture from ${userEmail}`,
        resource_type: 'raw',
        format: 'xlsx',
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result);
      },
    );

    const passthrough = new PassThrough();
    passthrough.end(buffer);
    passthrough.pipe(cldUploadStream);
  });
}
