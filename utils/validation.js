// validation email 
function isValidEmail(value) {
    return value && value.includes('@');
}
// validation password
function isValidPw(text, minLength = 1) {
    return text && text.trim().length >= minLength;
}

exports.isValidEmail = isValidEmail;
exports.isValidPw = isValidPw;