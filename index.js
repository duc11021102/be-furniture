const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const productsRoutes = require('./routes/products');
const authRoutes = require('./routes/auth');
const port = process.env.PORT || 8080;
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

app.get('/api', (req, res) => {
    res.send("App is running!");
})
app.use('/api/auth', authRoutes)
app.use('/api/products', productsRoutes);
app.listen(port, () => {
    console.log(`Started on port ${port}`);
});
module.exports.handler = serverless(app);