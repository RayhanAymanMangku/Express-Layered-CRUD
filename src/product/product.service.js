// untuk handle business logic
const { findProducts, findProductById, insertProduct, updateProduct } = require("./product.repository");

const getAllProducts = async () => {
    const products = await findProducts();
    return products;
}

const getProductById = async (productId) => {
    const product = await findProductById(productId);

    if (!product) {
        throw Error('Product not found');
    }

    return product;
}

const createProduct = async (newProductData) => {
    const product = await insertProduct(newProductData);

    return product;
}

const deleteProductById = async (productId) => {

    await getProductById(productId);

    await deleteProductById(productId);
}

const patchProductById = async (productId, productData) => {
   await getProductById(productId);

    const product = await updateProduct(productId, productData);

    return product;
}

const putProductById = async (productId, productData) => {
    
    await getProductById(productId);

    const product = await patchProductById(productId, productData);

    return product;
};



module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    deleteProductById,
    patchProductById,
    putProductById
}