const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.addAddressValidator = [
  check("alias").notEmpty().withMessage("Alias required"),

  check("details").notEmpty().withMessage("Details are required"),

  check("phone")
    .notEmpty()
    .withMessage("Phone is required")
    .isMobilePhone(["ar-EG", "ar-SA"])
    .withMessage("Invalid phone number only accepted Egy and SA phone numbers"),

  check("postalCode").optional().isPostalCode("any"),

  validatorMiddleware,
];

exports.deleteAddressValidator = [
  check("addressId").isMongoId().withMessage("Invalid Address id format"),
  validatorMiddleware,
];
