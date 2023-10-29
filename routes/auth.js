const express = require("express");
const { get, add } = require("../data/users");
const { isValidEmail, isValidPw } = require("../utils/validation");
const { isValidPassword } = require("../utils/auth");
const { createJSONToken } = require("../utils/auth");

const router = express.Router();

// đăng ký
router.post("/signin", async (req, res, next) => {
    const data = req.body;
    console.log(data);
    let errors = {}; // tạo một object lỗi

    // kiểm tra xem email có hợp lệ k
    if (!isValidEmail(data.email)) {
        errors.email = "Invalid email"; // set errors.email
    } else {
        try {
            const user = await get(data.email);
            if (!Object.keys(user).length === 0) { // nếu user trả về object rỗng nghĩa là email này chưa tồn tại
                errors.email = "Email exists already";
            }
        } catch (error) { }
    }

    // kiểm tra xem password có hợp lệ k
    if (!isValidPw(data.password, 6)) {
        errors.password = "Invalid password. Must be at least 6 characters long.";
    }

    // nếu có lỗi sẽ trả về một json chứa message và object lỗi
    if (Object.keys(errors).length > 0) {
        return res.status(422).json({
            message: "User signup failed due to validation errors.",
            errors,
        });
    }

    try {
        const createUser = await add(data);
        const authToken = createJSONToken(createUser.email); // tạo token
        // trả về json
        return res.status(201)
            .json({ message: "User created", user: createUser, token: authToken });
    } catch (error) {
        next(error);
    }
});
// đăng nhập 
router.post("/login", async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const user = await get(email);// lọc user bằng email
    // console.log(user);
    // nếu k lọc đc user nào thì sẽ ném ra lỗi
    if (user.length === 0) {
        return res
            .status(401)
            .json({ errors: [{ message: "invalid credentials" }] }); /// nếu k tìm thấy user sẽ trả ra lỗi
    }
    // so sánh password người dùng nhập và password trong database
    const pwIsValid = await isValidPassword(password, user[0].password);
    console.log(pwIsValid);
    // nếu người dùng nhập sai password thì sẽ ném ra lỗi
    if (!pwIsValid) {
        return res.status(422).json({
            message: "Invalid credentials.",
            errors: { credentials: "Invalid email or password entered." },
        });
    }
    // nếu password đúng thì sẽ đăng nhập thành công và trả về token
    const token = createJSONToken(email);
    return res.json({ message: "Logged in successfully", token: token });
});

module.exports = router;
