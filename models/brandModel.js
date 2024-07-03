const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Brand required"],
      unique: [true, "Brand must be unique"],
      minLength: [3, "Brand name too short"],
      maxLength: [32, "Brand name too long"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },
  { timestamps: true }
);

const setImageUrl = (doc) => {
  // return image base url + image name
  if (doc.image) {
    const imageUrl = `${process.env.BASE_URL}/brands/${doc.image}`;
    doc.image = imageUrl;
  }
};

// findOne, findAll and updateOne
brandSchema.post("init", function (doc) {
  setImageUrl(doc);
});

// createOne
brandSchema.post("save", function (doc) {
  setImageUrl(doc);
});

module.exports = mongoose.model("Brand", brandSchema);
