// middleware/upload.js
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudary');

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const folder = 'posts';
    const resource_type = file.mimetype.startsWith('video') ? 'video' : 'image';

    return {
      folder,
      resource_type,
      public_id: Date.now() + '-' + file.originalname.split('.')[0],
    };
  },
});

const upload = multer({ storage });

module.exports = upload;
