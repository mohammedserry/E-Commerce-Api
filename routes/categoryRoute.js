const express = require("express");

const {
  getAllCategories,
  createCategory,
  getSingleCategory,
  updateCategory,
  deleteCategory,
  uploadCategoryImage,
  resizeImage,
} = require("../controllers/categoryController");
const {
  getCategoryValidator,
  createCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} = require("../utils/validators/categoryValidator");

const authController = require("../controllers/authController");

const subcategoriesRoute = require("./subCategoryRoute");

const router = express.Router();

// Nested Route
router.use("/:categoryId/subcategories", subcategoriesRoute);

router
  .route("/")
  .get(getAllCategories)
  .post(
    authController.protect,
    authController.allowTo("manager", "admin"),
    uploadCategoryImage,
    resizeImage,
    createCategoryValidator,
    createCategory
  );

router
  .route("/:id")
  .get(getCategoryValidator, getSingleCategory)
  .patch(
    authController.protect,
    authController.allowTo("manager", "admin"),
    uploadCategoryImage,
    resizeImage,
    updateCategoryValidator,
    updateCategory
  )
  .delete(
    authController.protect,
    authController.allowTo("admin"),
    deleteCategoryValidator,
    deleteCategory
  );

module.exports = router;
