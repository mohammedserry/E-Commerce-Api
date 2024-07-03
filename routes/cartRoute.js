const express = require("express");
const {
  addProductToCart,
  getLoggedUserCart,
  removeSpecificCartItem,
  clearCart,
  updateCartItemQuantity,
  applyCoupon,
} = require("../controllers/cartController");
// const {
//   getBrandValidator,
//   createBrandValidator,
//   updateBrandValidator,
//   deleteBrandValidator,
// } = require("../utils/validators/brandValidator");

const authController = require("../controllers/authController");

const router = express.Router();

router.use(authController.protect, authController.allowTo("user"));

router
  .route("/")
  .post(addProductToCart)
  .get(getLoggedUserCart)
  .delete(clearCart);

router.route("/applyCoupon").patch(applyCoupon);

router
  .route("/:itemId")
  .delete(removeSpecificCartItem)
  .patch(updateCartItemQuantity);

module.exports = router;
