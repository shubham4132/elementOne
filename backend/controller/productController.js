import Product from "../models/productModel.js";
import handleAsyncError from "../middleware/handleAsyncError.js";
import { v2 as cloudinary } from "cloudinary";

export const createProducts = handleAsyncError(async (req, res, next) => {
  console.log("req.body →", req.body);
  console.log("req.files →", req.files);

  if (!req.files || !req.files.images) {
    return res.status(400).json({
      success: false,
      message: "Please upload at least one image",
    });
  }

  const images = Array.isArray(req.files.images)
    ? req.files.images
    : [req.files.images];

  const imageLinks = [];

  for (let i = 0; i < images.length; i++) {
    // ✅ buffer se stream — tempFilePath nahi
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "products" },
        (error, result) => {
          if (error) {
            console.log("Cloudinary Error →", error.message);
            reject(error);
          } else {
            console.log("Cloudinary Success →", result.secure_url);
            resolve(result);
          }
        },
      );
      stream.end(images[i].data); // ✅ Buffer directly
    });

    imageLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.image = imageLinks;
  req.body.user = req.user.id;

  if (req.body.ingredients && typeof req.body.ingredients === "string") {
    req.body.ingredients = JSON.parse(req.body.ingredients);
  }

  if (req.body.benefits && typeof req.body.benefits === "string") {
    req.body.benefits = JSON.parse(req.body.benefits);
  }

  if (req.body.originalPrice === "" || req.body.originalPrice === undefined) {
    req.body.originalPrice = null;
  }

  const product = await Product.create(req.body);

  console.log("Product created →", product._id);

  res.status(201).json({
    success: true,
    product,
  });
});

//for user side
export const getAllProducts = handleAsyncError(async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({
    success: true,
    products,
  });
});

//for admin
export const getAdminProducts = handleAsyncError(async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({
    success: true,
    products,
  });
});
