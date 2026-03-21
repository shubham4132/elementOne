import Wishlist from "../models/wishlistModel.js";
import handleAsyncError from "../middleware/handleAsyncError.js";
import HandleError from "../utils/handleError.js";

// ➕ Add/Remove product (toggle)
// export const toggleWishlist = handleAsyncError(async (req, res, next) => {
//   const { productId } = req.params;

//   let wishlist = await Wishlist.findOne({ user: req.user.id });

//   // Pehli baar wishlist bana raha hai
//   if (!wishlist) {
//     wishlist = await Wishlist.create({
//       user: req.user.id,
//       products: [productId],
//     });
//     return res.status(200).json({
//       success: true,
//       message: "Added to wishlist",
//       wishlist,
//     });
//   }

//   // Already wishlist mein hai — remove karo
//   const exists = wishlist.products.includes(productId);
//   if (exists) {
//     wishlist.products = wishlist.products.filter(
//       (id) => id.toString() !== productId,
//     );
//     await wishlist.save();
//     return res.status(200).json({
//       success: true,
//       message: "Removed from wishlist",
//       wishlist,
//     });
//   }

//   // Naya product add karo
//   wishlist.products.push(productId);
//   await wishlist.save();

//   res.status(200).json({
//     success: true,
//     message: "Added to wishlist",
//     wishlist,
//   });
// });
export const toggleWishlist = handleAsyncError(async (req, res, next) => {
  const { productId } = req.params;

  let wishlist = await Wishlist.findOne({ user: req.user.id });

  // Pehli baar wishlist bana raha hai
  if (!wishlist) {
    wishlist = await Wishlist.create({
      user: req.user.id,
      products: [productId],
    });
    // ✅ Populate karo
    const populated = await Wishlist.findById(wishlist._id).populate(
      "products",
    );
    return res.status(200).json({
      success: true,
      message: "Added to wishlist",
      wishlist: populated, // ✅
    });
  }

  // Already wishlist mein hai — remove karo
  const exists = wishlist.products.includes(productId);
  if (exists) {
    wishlist.products = wishlist.products.filter(
      (id) => id.toString() !== productId,
    );
    await wishlist.save();
    // ✅ Populate karo
    const populated = await Wishlist.findById(wishlist._id).populate(
      "products",
    );
    return res.status(200).json({
      success: true,
      message: "Removed from wishlist",
      wishlist: populated, // ✅
    });
  }

  // Naya product add karo
  wishlist.products.push(productId);
  await wishlist.save();
  // ✅ Populate karo
  const populated = await Wishlist.findById(wishlist._id).populate("products");
  res.status(200).json({
    success: true,
    wishlist: populated, // ✅ populated bhejo
  });
});

// 📋 Get wishlist
export const getWishlist = handleAsyncError(async (req, res, next) => {
  const wishlist = await Wishlist.findOne({ user: req.user.id }).populate(
    "products",
  );

  if (!wishlist) {
    return res.status(200).json({
      success: true,
      products: [],
    });
  }

  res.status(200).json({
    success: true,
    products: wishlist.products,
  });
});
