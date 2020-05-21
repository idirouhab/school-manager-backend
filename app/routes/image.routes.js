const {verifyToken} = require("../config/auth.middleware");
const multer = require('multer');
const path = require('path');
const {fromString} = require('uuidv4')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const extension = path.extname(file.originalname).substr(1)
        const fileName = fromString(new Date() + req.userId) + '.' + extension
        req.imageName = fileName
        cb(null, fileName )
    }
})

const upload = multer({storage: storage})

module.exports = app => {
    const image = require("../controllers/image.controller.js");
    const router = require("express").Router();

    router.post("/", [verifyToken, upload.single('image')], image.create);
    router.delete("/:id", [verifyToken], image.delete);
    //router.post("/" [verifyToken], image.create);
    app.use('/api/image', router);
};
