const Jimp = require('jimp');

exports.resize = (buffer) => {
    return Jimp.read(buffer).then(image => {
        const height = (image.bitmap.width * 9) / 16;
        return image
            .resize(image.bitmap.width, height)
            .quality(60)
            .getBufferAsync(Jimp.AUTO)
    })
};
