const express = require("express");
const {
  getAllCoupons,
  getSingleCoupon,
  createCoupon,
  deleteCoupon,
  updateCoupon,
} = require("../controllers/couponController");

const {
  getCouponValidator,
  createCouponValidator,
  updateCouponValidator,
  deleteCouponValidator,
} = require("../utils/validators/couponValidator");

const authController = require("../controllers/authController");

const router = express.Router();

router.use(authController.protect, authController.allowTo("admin", "manager"));

router.route("/").get(getAllCoupons).post(createCouponValidator, createCoupon);

router
  .route("/:id")
  .get(getCouponValidator, getSingleCoupon)
  .patch(updateCouponValidator, updateCoupon)
  .delete(deleteCouponValidator, deleteCoupon);

module.exports = router;
