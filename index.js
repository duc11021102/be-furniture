const express = require('express');
const bodyParser = require('body-parser');
const productsRoutes = require('./routes/products');
const authRoutes = require('./routes/auth');
const app = express();
app.use(bodyParser.json()); // phân tích và xử lí dữ liệu , trích xuất dữ liệu và biến nó thành 1 đối tượng
app.use(express.static('public')); // cung cấp tài nguyên tĩnh trong folder public 
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, OPTIONS'
    );
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-Requested-With,content-type'
    );
    next();
});

app.get('/', (req, res) => {
    res.send("hello");
})
app.use(authRoutes)
app.use('/products', productsRoutes);
app.listen(8080);