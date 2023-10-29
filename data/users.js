const { hash } = require("bcryptjs");
const { v4: generateId } = require("uuid");
const { readData, writeData } = require("../data/util");
const { NotFoundData } = require("../utils/error");


// thêm user vào database 
async function add(data) {
    const storedData = await readData();
    const userId = generateId();
    const hashedPw = await hash(data.password, 12); // chuyển mật khẩu thành mã hash 
    if (!storedData.users) {
        storedData.users = [];
    }
    storedData.users.push({ ...data, password: hashedPw, id: userId });
    // user : {
    //     id: userId,
    //     email: email,
    //     password : hashedPw
    // }
    await writeData(storedData);// cập nhật lại users trong data
    return { id: userId, email: data.email };
}

// lọc và  lấy 1 user trong database 
async function get(email) {
    const storedData = await readData();
    //nếu k có user trong data thì sẽ ném ra lỗi
    if (!storedData.users || storedData.users.length === 0) {
        throw new NotFoundData("Could not find any users")
    }
    // lọc user theo email
    const user = storedData.users.filter((user) => user.email === email);
    if (!user) {
        throw new NotFoundData("Could not find user");
    }
    // trả về user bao gồm id , email, hashedPw
    return user;
}

exports.add = add;
exports.get = get;