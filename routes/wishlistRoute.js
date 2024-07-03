const express = require("express");
const {
  addProductToWishlist,
  deleteProductFromWishlist,
  getLoggedUserWishlist,
} = require("../controllers/wishlistController");

const {
  addProductToWishlistValidator,
  deleteProductFromWishlistValidator,
} = require("../utils/validators/wishlistValidator");

const authController = require("../controllers/authController");

const router = express.Router();

router.use(authController.protect, authController.allowTo("user"));

router
  .route("/")
  .post(addProductToWishlistValidator, addProductToWishlist)
  .get(getLoggedUserWishlist);

router.delete(
  "/:productId",
  deleteProductFromWishlistValidator,
  deleteProductFromWishlist
);

module.exports = router;
