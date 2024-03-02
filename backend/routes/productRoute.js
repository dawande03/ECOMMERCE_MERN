const express = require("express");
const { getAllProducts, createProduct, updateProduct, DeleteProduct, getProductDetails, createProductReview, getProductReviews, deleteReviews    } = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

<<<<<<< HEAD
// router.route("/products").get(isAuthenticatedUser,getAllProducts);
router.route("/products").get(getAllProducts);
router.route("/admin/product/new").post(isAuthenticatedUser,authorizeRoles("admin"),createProduct);
=======
router.route("/products").get(isAuthenticatedUser,getAllProducts)
router.route("/admin/product/new").post(isAuthenticatedUser,authorizeRoles("admin"),createProduct)
>>>>>>> 71d636c5c85ccb323282f8eba8e30437c8349eec
router.route("/admin/product/:id").put(updateProduct,authorizeRoles("admin")).delete(DeleteProduct,authorizeRoles("admin"));

router.route("/product/:id").get(getProductDetails);
router.route("/review").put(isAuthenticatedUser,createProductReview);
router.route("/reviews").get(getProductReviews).delete(isAuthenticatedUser,deleteReviews);



module.exports = router