const express = require("express");
const {
  getAllBrands,
  createBrand,
  getSingleBrand,
  updateBrand,
  deleteBrand,
  uploadBrandImage,
  resizeImage,
} = require("../controllers/brandController");
const {
  getBrandValidator,
  createBrandValidator,
  updateBrandValidator,
  deleteBrandValidator,
} = require("../utils/validators/brandValidator");

const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(getAllBrands)
  .post(
    authController.protect,
    authController.allowTo("manager", "admin"),
    uploadBrandImage,
    resizeImage,
    createBrandValidator,
    createBrand
  );

router
  .route("/:id")
  .get(getBrandValidator, getSingleBrand)
  .patch(
    authController.protect,
    authController.allowTo("manager", "admin"),
    uploadBrandImage,
    resizeImage,
    updateBrandValidator,
    updateBrand
  )
  .delete(
    authController.protect,
    authController.allowTo("admin"),
    deleteBrandValidator,
    deleteBrand
  );

module.exports = router;
