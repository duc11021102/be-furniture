// đọc nội dung tệp json
const fs = require("node:fs/promises");

// đọc dữ liệu từ file json
async function readData() {
    const data = await fs.readFile("products.json", "utf-8");
    // data chứa một chuỗi json
    // xử lí chuyển đổi json sang object (đối tượng) javascript
    const jsonData = JSON.parse(data);
    // console.log(jsonData);
    return jsonData;
}

// ghi dữ liệu vào file json
async function writeData(data) {
    // dữ liệu data được đổi thành định dạng json
    await fs.writeFile("products.json", JSON.stringify(data));
}

exports.readData = readData;
exports.writeData = writeData;
