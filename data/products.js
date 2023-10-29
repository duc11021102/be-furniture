const NotFoundData = require('../utils/error');
const { readData, writeData } = require('./util');
const { v4: generateId } = require('uuid');

// tạo một hàm get all products 
async function getAll() {
    // lưu dữ liệu products vào biến storedData
    const storedData = await readData();
    // nếu không có dữ liệu sẽ ném ra error
    if (!storedData.products) {
        throw new NotFoundData('Cound not find products');
    }
    // console.log(storedData.products);
    // trả về danh sách các products
    return storedData.products;
}

// tạo 1 hàm lấy 1 product
async function getById(id) {
    // lưu dữ liệu products vào biến storedData
    const storedData = await readData();
    // nếu không có dữ liệu sẽ ném ra error
    if (!storedData.products) {
        throw new NotFoundData('Cound not find products');
    }
    // lọc tìm product theo id
    const product = storedData.products.find((product) => product.id === id);
    // nếu k thấy product sẽ ném ra error
    if (!product) {
        throw new NotFoundData('Cound not find product');
    }
    // trả về 1 product
    return product;
}

// tạo hàm thêm 1 product vào cơ sở dữ liệu
async function add(data) {
    // lưu dữ liệu products vào biến storedData
    const storedData = await readData();
    // đưa dữ liệu mới vào đầu danh sách products
    storedData.products.unshift({ id: generateId(), ...data });
    // viết lại danh sách products vào file json
    await writeData(storedData);

}

// tạo hàm sửa product
async function edit(id, data) {
    const storedData = await readData();
    if (!storedData.products) {
        throw new NotFoundData('Cound not find products');
    }
    const index = storedData.products.findIndex((product) => product.id === id);
    if (index < 0) {
        throw new NotFoundData("Could not find product for id : " + id);
    }
    storedData.product[id] = { id, ...data };
    await writeData(storedData);
}

exports.getAll = getAll;
exports.getById = getById;
exports.add = add;
exports.edit = edit;