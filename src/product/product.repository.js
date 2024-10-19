// berkomunikasi dengan database
const prisma = require("../db");

const findProducts = async () => {
    const products = await prisma.product.findMany();
    return products;
}

const findProductById = async (productId) => {
    const product = await prisma.product.findUnique({
        where: {
            id: productId
        }
    });

    return product;
}

const insertProduct = async (newProductData) => {
    const product = await prisma.product.create({
        data: {
            name: newProductData.name,
            price: newProductData.price,
            description: newProductData.description,
            image: newProductData.image,
        }
    });

    return product;
}

const deleteProductById = async (productId) => {
    await prisma.product.delete({
        where: {
            id: productId
        }
    });
}

const updateProduct = async (productId, productData) => {
    const product = await prisma.product.update({
        where: {
            id: productId
        },
        data: {
            name: productData.name,
            price: productData.price,
            description: productData.description,
            image: productData.image
        }
    });

    return product;
}

module.exports = {
    findProducts,
    findProductById,
    insertProduct,
    deleteProductById,
    updateProduct
}