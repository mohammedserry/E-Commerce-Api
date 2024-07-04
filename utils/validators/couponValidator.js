const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const Coupon = require("../../models/couponModel");

exports.getCouponValidator = [
  check("id").isMongoId().withMessage("Invalid Coupon id format"),
  validatorMiddleware,
];

exports.createCouponValidator = [
  check("name")
    .notEmpty()
    .withMessage("Coupon name required")
    .isLength({ min: 3 })
    .withMessage("Too short Coupon name")
    .isLength({ max: 32 })
    .withMessage("Too long Coupon name")
    .isUppercase()
    .withMessage("Coupon name must be uppercase")
    .custom(async (name) => {
      // Check if coupon with the same name already exists
      const existingCoupon = await Coupon.findOne({ name });
      if (existingCoupon) {
        return Promise.reject(new Error("Coupon name already exists"));
      }
    }),

  check("expire")
    .notEmpty()
    .withMessage("Coupon expire time required")
    .isDate()
    .withMessage("Coupon expire time must be date"),

  check("discount")
    .notEmpty()
    .withMessage("Discount is required")
    .isNumeric()
    .withMessage("Discount must be number"),
  validatorMiddleware,
];

exports.updateCouponValidator = [
  check("id").isMongoId().withMessage("Invalid Coupon id format"),
  check("name")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Too short Coupon name")
    .isLength({ max: 32 })
    .withMessage("Too long Coupon name")
    .custom(async (name) => {
      // Check if coupon with the same name already exists
      const existingCoupon = await Coupon.findOne({ name });
      if (existingCoupon) {
        return Promise.reject(new Error("Coupon name already exists"));
      }
    }),

  check("expire")
    .optional()
    .isDate()
    .withMessage("Coupon expire time must be date"),

  check("discount")
    .optional()
    .isNumeric()
    .withMessage("Discount must be number"),
  validatorMiddleware,
];

exports.deleteCouponValidator = [
  check("id").isMongoId().withMessage("Invalid Coupon id format"),
  validatorMiddleware,
];
