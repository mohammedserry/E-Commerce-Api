const express = require("express");
const {
  createCashOrder,
  getAllOrders,
  getSpecificOrder,
  filterOrderForLoggedUser,
  updateOrderToDelivered,
  updateOrderToPaid,
  checkoutSession,
} = require("../controllers/orderController");

const authController = require("../controllers/authController");

const router = express.Router();

router.use(authController.protect);

router.get(
  "/checkout-session/:cartId",
  authController.allowTo("user"),
  checkoutSession
);

router.route("/:cartId").post(authController.allowTo("user"), createCashOrder);

router
  .route("/")
  .get(
    authController.allowTo("user", "admin", "manager"),
    filterOrderForLoggedUser,
    getAllOrders
  );

router.route("/:id").get(getSpecificOrder);

router.patch(
  "/:id/pay",
  authController.allowTo("admin", "manager"),
  updateOrderToPaid
);
router.patch(
  "/:id/deliver",
  authController.allowTo("admin", "manager"),
  updateOrderToDelivered
);

module.exports = router;
