const { sign, verify } = require('jsonwebtoken');
// hàm sign sẽ trả về một chuỗi Jwtoken  
const { compare } = require('bcryptjs'); // so sánh , kiểm tra xem password có đúng hay k
const KEY = "superkey";
const { NotAuthError } = require('../utils/error')

function createJSONToken(email) {
    return sign({ email }, KEY, { expiresIn: '1h' }); // trả về jwtoken
}
function validateJSONToken(token) {
    return verify(token, KEY);
}
// function isValidPassword(password, storedPassword, call) {
//     return compare(password, storedPassword, call = (err, result) => {
//     });// so sánh , kiểm tra xem password có đúng hay k
// }
function isValidPassword(password, storedPassword) {
    return compare(password, storedPassword);// so sánh , kiểm tra xem password có đúng hay k
}

exports.createJSONToken = createJSONToken;
exports.isValidPassword = isValidPassword;
exports.validateJSONToken = validateJSONToken;



