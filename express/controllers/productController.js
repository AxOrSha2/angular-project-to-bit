const Product = require('../models/Product');

exports.createProduct = async (req, res) => {
    try {
        let product_data;
        product_data = new Product(req.body);
        await product_data.save();
        res.send(product_data)
    } catch (error) {
        console.log(error);
        res.status(500).send('Ups... Hay un error, comuniquese con soporte');
    }
}

exports.findProduct = async (req, res) => {
    try {
        const product_data = await Product.findById(req.params.id);

        if (!product_data) {
            res.status(404).json({ mensaje: 'No se encontraron coincidencias' })
        }
        res.json(product_data);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ups... Hay un error, comuniquese con soporte');
    }
}


exports.findProducts = async (req, res) => {
    try {
        const product_data = await Product.find();
        res.json(product_data);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ups... Hay un error, comuniquese con soporte');
    }
}

exports.updateProducts = async (req, res) => {
    try {
        const { name, price, description, seller, stock_available, imgPath } = req.body
        let product_data = await Product.findById(req.params.id);

        if (!product_data) {
            res.status(404).json({ mensaje: 'No se encontraron coincidencias para la actualización de datos' })
        }

        product_data.name = name;
        product_data.price = price;
        product_data.description = description;
        product_data.seller = seller;
        product_data.stock_available = stock_available;
        product_data.imgPath = imgPath;

        product_data = await Product.findOneAndUpdate({ _id: req.params.id }, product_data, { new: true })
        res.json(product_data);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ups... Hay un error, comuniquese con soporte');
    }
}

exports.deleteProducts = async (req, res) => {
    try {
        const product_data = await Product.findById(req.params.id);
        if (!product_data) {
            res.status(404).json({ mensaje: 'No se encontraron coincidencias para eliminar productos' })
        }
        await Product.findByIdAndRemove({ _id: req.params.id });
        res.json({ mensaje: 'Producto eliminado correctamente' });
    } catch (error) {
        console.log(error);
        res.status(500).send('Ups... Hay un error, comuniquese con soporte');
    }
}