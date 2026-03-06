import Product from "../models/productModel.js";
import handleAsyncError from "../middleware/handleAsyncError.js";
import { v2 as cloudinary } from "cloudinary";
import APIFunctionality from "../utils/apiFunctionality.js";

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

export const getAllProducts = handleAsyncError(async (req, res, next) => {
  const apiFeatures = new APIFunctionality(Product.find(), req.query)
    .search()
    .filter(); // sirf search karo

  const productCount = await apiFeatures.query.clone().countDocuments();

  const products = await apiFeatures.query;

  if (!products || products.length === 0) {
    return next(new HandleError("No Product Found", 404));
  }

  res.status(200).json({
    success: true,
    products,
    productCount,
  });
});

//Accessing Single Product
export const getSingleProduct = handleAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new HandleError("Product Not Found", 404));
  }
  res.status(200).json({
    success: true,
    product,
  });
});

//for admin side
export const getAdminProducts = handleAsyncError(async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({
    success: true,
    products,
  });
});

export const deleteProduct = handleAsyncError(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    return next(new HandleError("Product Not Found", 404));
  }
  for (let i = 0; i < product.image.length; i++) {
    await cloudinary.uploader.destroy(product.image[i].public_id);
  }
  res.status(200).json({
    success: true,
    message: "Product Deleted successfully",
  });
});

export const updateProduct = handleAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new HandleError("Product Not Found", 404));
  }

  // Parse ingredients aur benefits
  if (req.body.ingredients && typeof req.body.ingredients === "string") {
    req.body.ingredients = JSON.parse(req.body.ingredients);
  }
  if (req.body.benefits && typeof req.body.benefits === "string") {
    req.body.benefits = JSON.parse(req.body.benefits);
  }

  // ✅ FIX: deletedImageIds parse karo aur cloudinary se delete karo
  let deletedPublicIds = [];
  if (req.body.deletedImageIds) {
    deletedPublicIds = JSON.parse(req.body.deletedImageIds);
  }

  // Cloudinary se delete karo
  for (const public_id of deletedPublicIds) {
    await cloudinary.uploader.destroy(public_id);
  }

  // ✅ Existing images mein se deleted wali hata do
  let currentImages = product.image.filter(
    (img) => !deletedPublicIds.includes(img.public_id),
  );

  // ✅ Nayi images upload karo (agar aayi hain)
  if (req.files && req.files.images) {
    const images = Array.isArray(req.files.images)
      ? req.files.images
      : [req.files.images];

    const newImageLinks = [];
    for (let i = 0; i < images.length; i++) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "products" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          },
        );
        stream.end(images[i].data);
      });

      newImageLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    // ✅ Bachi hui existing + nayi images
    currentImages = [...currentImages, ...newImageLinks];
  }

  req.body.image = currentImages;

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    product,
  });
});
