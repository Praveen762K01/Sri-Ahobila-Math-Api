const path = require('path');
const multer = require('multer');

// File filter to allow only jpeg and png formats
const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png'];
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Unsupported format'), false);
    }
};

// Function to create a multer storage configuration
const createStorage = (uploadPath) => {
    return multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}${path.extname(file.originalname)}`);
        }
    });
};

// Configuring multer instances for different upload paths
const createMulterUpload = (uploadPath) => {
    return multer({
        storage: createStorage(uploadPath),
        limits: { fileSize: 1024 * 1024 * 10 }, // 10MB limit
        fileFilter: fileFilter
    });
};

const userImageUpload = createMulterUpload('./uploads/user');
const azvarUpload = createMulterUpload('./uploads/azvar');
const azagiyasingarUpload = createMulterUpload('./uploads/azagiyasingar');
const goodaraivalliImageUpload = createMulterUpload('./uploads/goodaraivalli');
const descriptionImageUpload = createMulterUpload('./uploads/descriptionImage');

module.exports = {
    userImageUpload: userImageUpload,
    azvarUpload: azvarUpload,
    azagiyasingarUpload: azagiyasingarUpload,
    goodaraivalliImageUpload: goodaraivalliImageUpload,
    descriptionImageUpload:descriptionImageUpload
}