// const asyncHandler = require("express-async-handler");
const factory = require("./handlersFactory");
const Review = require("../models/reviewModel");

// Nested route
// GET /api/v1/products/:productId/reviews
exports.createFilterObj = (req, res, next) => {
  let filterObject = {};
  if(req.params.productId) filterObject = { product : req.params.productId};
  req.filterObj = filterObject;
  next();
};

// @desc    Get list of reviews
// @route   GET /api/v1/reviews
// @access  Public
exports.getAllReviews = factory.getAll(Review, "Review");

// @desc    Get specific review by id
// @route   GET /api/v1/reviews/:id
// @access  Public
exports.getSingleReview = factory.getOne(Review);

// Nested route (Create)
// POST /api/v1/products/:productId/reviews
exports.setProductIdAndUserIdToBody = (req, res, next) =>{
  if(!req.body.product) req.body.product = req.params.productId;
  if(!req.body.user) req.body.user = req.user._id;
  next();
};

// @desc    Create review
// @route   POST  /api/v1/reviews
// @access  Private/protect/User
exports.createReview = factory.createOne(Review);

// @desc    Update specific review
// @route   PATCH /api/v1/reviews/:id
// @access  Private/protect/User
exports.updateReview = factory.updateOne(Review);

// @desc    Delete specific review
// @route   DELETE /api/v1/reviews/:id
// @access  Private/protect/User-Admin-Manager
exports.deleteReview = factory.deleteOne(Review);


