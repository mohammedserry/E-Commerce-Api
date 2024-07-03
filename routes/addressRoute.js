const express = require("express");
const {
  addAddress,
  deleteAddress,
  getLoggedUserAddresses,
} = require("../controllers/addressController");

const {
  addAddressValidator,
  deleteAddressValidator,
} = require("../utils/validators/addressValidator");

const authController = require("../controllers/authController");

const router = express.Router();

router.use(authController.protect, authController.allowTo("user"));

router
  .route("/")
  .post(addAddressValidator, addAddress)
  .get(getLoggedUserAddresses);

router.delete("/:addressId", deleteAddressValidator, deleteAddress);

module.exports = router;
