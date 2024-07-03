const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category required"],
      unique: [true, "Category must be unique"],
      minLength: [3, "Category name too short"],
      maxLength: [32, "Category name too long"],
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
    const imageUrl = `${process.env.BASE_URL}/categories/${doc.image}`;
    doc.image = imageUrl;
  }
};

// findOne, findAll and updateOne
categorySchema.post("init", function (doc) {
  setImageUrl(doc);
});

// createOne 
categorySchema.post("save", function (doc) {
  setImageUrl(doc);
});

module.exports = mongoose.model("Category", categorySchema);
