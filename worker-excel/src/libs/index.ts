import * as cloudinary from 'cloudinary';
import * as config from 'config';

cloudinary.v2.config({
  cloud_name: config.get('cloudinary.name'),
  api_key: config.get('cloudinary.key'),
  api_secret: config.get('cloudinary.secret'),
});

export default cloudinary;
