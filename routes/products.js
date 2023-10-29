const express = require("express");
const { getAll, getById, add } = require("../data/products");
const { getImages } = require('../data/images');
const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const productsData = await getAll();
        res.json({ products: productsData });
    } catch (error) {
        next(error);
    }
});

router.get("/images", async (req, res, next) => {
    try {
        const images = await getImages();
        res.json({ images });
    } catch (error) {
        next(error);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        // req.params.id lấy id theo params
        const productData = await getById(req.params.id);
        // trả về dữ liệu theo định dạng json
        res.json({ product: productData });
    } catch (error) {
        next(error);
    }
});

router.post("/", async (req, res, next) => {
    const data = req.body;
    try {
        await add(data);
        res.status(201).json({ message: "Added products", product: data });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
