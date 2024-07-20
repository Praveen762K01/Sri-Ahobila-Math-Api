const path = require('path');
const multer = require('multer');

const fileFilter=(req,file,cb)=>{
    if(file.mimetype==='image/jpeg' || file.mimetype==='image/png'){
        cb(null,true);
    }else{
        cb(new Error('Unsupported format'),false);
    }
}

const userImageStorage = multer.diskStorage({
    destination:function (req, file, cb){
        cb(null,'./uploads/user');
    },
    filename: function(req, file, cb){
        cb(null, new Date().getTime()+path.extname(file.originalname));
    }
});

const userImageUpload=multer({
    storage:userImageStorage,
    limits:{fileSize:1024*1024*10},
    fileFilter:fileFilter
});

const azvarStorage = multer.diskStorage({
    destination:function (req, file, cb){
        cb(null,'./uploads/azvar');
    },
    filename: function(req, file, cb){
        cb(null, new Date().getTime()+path.extname(file.originalname));
    }
});

const azvarUpload=multer({
    storage:azvarStorage,
    limits:{fileSize:1024*1024*10},
    fileFilter:fileFilter
});

const azagiyasingarStorage = multer.diskStorage({
    destination:function (req, file, cb){
        cb(null,'./uploads/azagiyasingar');
    },
    filename: function(req, file, cb){
        cb(null, new Date().getTime()+path.extname(file.originalname));
    }
});

const azagiyasingarUpload=multer({
    storage:azagiyasingarStorage,
    limits:{fileSize:1024*1024*10},
    fileFilter:fileFilter
});


module.exports = {
    userImageUpload:userImageUpload,
   azvarUpload:azvarUpload,
   azagiyasingarUpload:azagiyasingarUpload
}