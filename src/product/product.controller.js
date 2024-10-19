// layer untuk mengatur request dan response dari client
// handle validasi body request

const express = require('express');
const router = express.Router();
const { getAllProducts, getProductById, createProduct, deleteProductById, patchProductById, putProductById } = require('./product.service');

router.get('/', async (req, res) => {
    const products = await getAllProducts();
    res.send(products);
});

router.get('/:id', async (req, res) => {

    try {
        const productId = parseInt(req.params.id);
        const product = await getProductById(parseInt(productId));
    
        res.send(product);
        
    } catch (error) {
        res.status(400).send(error.message);
    }
})

router.post('/', async (req, res) => {

    try {
        const newProductData = req.body;
        const product = await createProduct(newProductData);
    
        res.send({
            data: product,
            message: 'Product created successfully'
        });
        
    } catch (error) {
        res.status(400).send(error.message);
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const productId = req.params.id; // string
        await deleteProductById(parseInt(productId));
        res.send({
            message: 'Product deleted successfully'
        });
        
    } catch (error) {
        res.status(400).send(error.message);
    }
})

router.put('/:id', async (req, res) => {

    const productId = req.params.id;
    const updatedProductData = req.body;

    if(!(updatedProductData.image && updatedProductData.description && updatedProductData.name && updatedProductData.price)) {
        return res.status(400).send('Please provide all required fields');
    }
    
    const product = await putProductById(parseInt(productId), updatedProductData);
    
    res.send({
        data: product,
        message: 'Product updated successfully'
    });
    
})

router.patch('/:id', async (req, res) => {

    try {
        const productId = parseInt(req.params.id);
        const productData = req.body;
    
        const product = await patchProductById(productId, productData);
    
        res.send({
            data: product,
            message: 'Product edit successfully'
        });
        
    } catch (error) {
        res.status(400).send(error.message);
    }
})

module.exports = router;