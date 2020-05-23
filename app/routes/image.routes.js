const {verifyToken} = require("../config/auth.middleware");
const multer = require('multer');
const inMemoryStorage = multer.memoryStorage();
const singleFileUpload = multer({ storage: inMemoryStorage });

module.exports = app => {
    const image = require("../controllers/image.controller.js");
    const router = require("express").Router();

    router.post("/", [verifyToken, singleFileUpload.single('image')], image.create);
    router.delete("/:id", [verifyToken], image.delete);
    router.get("/:id" , image.findOne);
    app.use('/api/image', router);
};
