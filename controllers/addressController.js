const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

// @desc    Add address to user addresses list
// @route   POST /api/v1/addresses
// @access  Private/protect/user
exports.addAddress = asyncHandler(async (req, res, next) => {
  // $addToSet => add address object to user addresses array
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $addToSet: { addresses: req.body },
    },
    { new: true }
  );

  res.status(200).json({
    status: "Success",
    message: "Address added successfully",
    data: user.addresses,
  });
});

// @desc    Delete address from user addresses list
// @route   DELETE /api/v1/addresses/:addressId
// @access  Private/protect/user
exports.deleteAddress = asyncHandler(async (req, res, next) => {
  // $pull => remove address object from user addresses array
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $pull: { addresses: { _id: req.params.addressId } },
    },
    { new: true }
  );

  res.status(200).json({
    status: "Success",
    results: user.addresses.length,
    message: "Address removed successfully",
    data: user.addresses,
  });
});

// @desc    Get logged user addresses
// @route   GET /api/v1/addresses
// @access  Private/protect/user
exports.getLoggedUserAddresses = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id).populate("addresses");

  res.status(200).json({
    status: "Success",
    results: user.addresses.length,
    data: user.addresses,
  });
});
