const NotFoundData = require('../utils/error');
const { readData } = require('./util');

async function getImages() {
    const storedData = await readData();
    if (!storedData.images) {
        throw new NotFoundData('Cound not find products');
    }
    return storedData.images;
}

exports.getImages = getImages;