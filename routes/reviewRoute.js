const express = require("express");
const {
  getAllReviews,
  createReview,
  getSingleReview,
  updateReview,
  deleteReview,
  createFilterObj,
  setProductIdAndUserIdToBody,
} = require("../controllers/reviewController");
const {
  getReviewValidator,
  createReviewValidator,
  updateReviewValidator,
  deleteReviewValidator,
} = require("../utils/validators/reviewValidator");

const authController = require("../controllers/authController");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(createFilterObj, getAllReviews)
  .post(
    authController.protect,
    authController.allowTo("user"),
    setProductIdAndUserIdToBody,
    createReviewValidator,
    createReview
  );

router
  .route("/:id")
  .get(getReviewValidator, getSingleReview)
  .patch(
    authController.protect,
    authController.allowTo("user"),
    updateReviewValidator,
    updateReview
  )
  .delete(
    authController.protect,
    authController.allowTo("admin", "manager", "user"),
    deleteReviewValidator,
    deleteReview
  );

module.exports = router;
