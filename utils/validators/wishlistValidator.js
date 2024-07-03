const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const Product = require("../../models/productModel");

exports.addProductToWishlistValidator = [
  check("productId")
    .notEmpty()
    .withMessage("ProductId is required")
    .isMongoId()
    .withMessage("Invalid ID format")
    .custom(async (productId) => {
      const product = await Product.findById(productId);
      if (!product) {
        return Promise.reject(
          new Error(`No product found for ID: ${productId}`)
        );
      }
    }),
  validatorMiddleware,
];

exports.deleteProductFromWishlistValidator = [
  check("id").isMongoId().withMessage("Invalid Product ID format"),
  validatorMiddleware,
];
