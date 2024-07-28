const path = require('path');
const multer = require('multer');

// const fileFilter=(req,file,cb)=>{
//     if(file.mimetype==='image/jpeg' || file.mimetype==='image/png'){
//         cb(null,true);
//     }else{
//         cb(new Error('Unsupported format'),false);
//     }
// }

// // ========================================================================================

// const userImageStorage = multer.diskStorage({
//     destination:function (req, file, cb){
//         cb(null,'./uploads/user');
//     },
//     filename: function(req, file, cb){
//         cb(null, new Date().getTime()+path.extname(file.originalname));
//     }
// });

// const userImageUpload=multer({
//     storage:userImageStorage,
//     limits:{fileSize:1024*1024*10},
//     fileFilter:fileFilter
// });

// // ==========================================================================================

// const azvarStorage = multer.diskStorage({
//     destination:function (req, file, cb){
//         cb(null,'./uploads/azvar');
//     },
//     filename: function(req, file, cb){
//         cb(null, new Date().getTime()+path.extname(file.originalname));
//     }
// });

// const azvarUpload=multer({
//     storage:azvarStorage,
//     limits:{fileSize:1024*1024*10},
//     fileFilter:fileFilter
// });

// // ================================================================================================

// const azagiyasingarStorage = multer.diskStorage({
//     destination:function (req, file, cb){
//         cb(null,'./uploads/azagiyasingar');
//     },
//     filename: function(req, file, cb){
//         cb(null, new Date().getTime()+path.extname(file.originalname));
//     }
// });

// const azagiyasingarUpload=multer({
//     storage:azagiyasingarStorage,
//     limits:{fileSize:1024*1024*10},
//     fileFilter:fileFilter
// });

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

module.exports = {
    userImageUpload: userImageUpload,
    azvarUpload: azvarUpload,
    azagiyasingarUpload: azagiyasingarUpload,
    goodaraivalliImageUpload: goodaraivalliImageUpload
}