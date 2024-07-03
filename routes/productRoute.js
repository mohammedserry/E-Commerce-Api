const express = require("express");
const {
  getAllProducts,
  createProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadProductImages,
  resizeProductImages,
} = require("../controllers/productController");
const {
  getProductValidator,
  createProductValidator,
  updateProductValidator,
  deleteProductValidator,
} = require("../utils/validators/productValidator");

const authController = require("../controllers/authController");
const reviewsRoute = require("./reviewRoute")

const router = express.Router();

// Nested route
router.use("/:productId/reviews", reviewsRoute)

router
  .route("/")
  .get(getAllProducts)
  .post(
    authController.protect,
    authController.allowTo("manager", "admin"),
    uploadProductImages,
    resizeProductImages,
    createProductValidator,
    createProduct
  );

router
  .route("/:id")
  .get(getProductValidator, getSingleProduct)
  .patch(
    authController.protect,
    authController.allowTo("manager", "admin"),
    uploadProductImages,
    resizeProductImages,
    updateProductValidator,
    updateProduct
  )
  .delete(
    authController.protect,
    authController.allowTo("admin"),
    deleteProductValidator,
    deleteProduct
  );

module.exports = router;
