const multer = require('multer');

//상품 설명 이미지 저장공간 설정
const descriptionImgUploadStorage = multer.diskStorage({
    destination: 'uploads/product_description_imgs/',
    filename: (req, file, cb) => {
        //폰트 깨짐 방지
        const originalName = Buffer.from(file.originalname, 'latin1').toString('utf8');
        const safeName = originalName.replace(/[^A-Za-z0-9가-힣._-]/g, '_');
        cb(null, `${Date.now()}-${safeName}`);
    }
});

const descriptionUpload = multer({
    storage: descriptionImgUploadStorage,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB
    }
});

//상품 이미지 저장공간 설정
const productImgUploadStorage = multer.diskStorage({
    destination: 'uploads/product_imgs/',
    filename: (req, file, cb) => {
        const originalName = Buffer.from(file.originalname, 'latin1').toString('utf8');
        const safeName = originalName.replace(/[^A-Za-z0-9가-힣._-]/g, '_');
        cb(null, `${Date.now()}-${safeName}`);
    }
});

const productUpload = multer({
    storage: productImgUploadStorage,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB
    }
});

module.exports = {
    descriptionUpload,
    productUpload
};
