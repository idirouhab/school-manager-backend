const fs = require('fs');
const Jimp = require('jimp');
let path = 'uploads/';


exports.create = (req, res) => {
    const imageId = req.imageName;
    const fullPath = path + imageId;
    const data = {
        uuid: imageId
    };

    Jimp.read(fullPath).then(image => {
        const height = (image.bitmap.width * 9) / 16;
        return image
            .resize(image.bitmap.width, height)
            .quality(60)
            .greyscale()
            .write(fullPath);
    }).catch((err)=>{
        fs.unlinkSync(fullPath);
        res.status(500).send({
            message:
                err.message || "Some error occurred while deleting the Image."
        });
    }).finally(()=>{
        res.send(data)
    });

};

exports.delete = (req, res) => {
    try {
        fs.unlinkSync(path + req.params.id);
        res.send({});
    } catch (err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while deleting the Image."
        });
    }
};
