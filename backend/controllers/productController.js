const Product = require("../models/prodectModels");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");

// Create Product -- (Admin)
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
    req.body.user = req.user.id
    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
});

// Get All Products
exports.getAllProducts = catchAsyncErrors(async (req, res) => {

   // return next(new ErrorHandler("This is my temp error",500))
    const resultPrePage = 9;
    const productsCount = await Product.countDocuments();

    const apiFeatures = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    let products = await apiFeatures.query;
    let filteredProductsCount = products.length;
    apiFeatures.pagination(resultPrePage);
    products = await apiFeatures.query;
    
    res.status(200).json({
        success: true,
        products,
        productsCount,
        resultPrePage,
        filteredProductsCount
    })
});

// Get Product details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        // return res.status(500).json({
        //     success:false,
        //     message:"Product not found"
        // })
        return next(new ErrorHandler("Product not fount", 404))
    }

    res.status(200).json({
        success: true,
        product
    })
});

// Update Product -- Admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
        return res.status(500).json({
            success: false,
            message: "Product not found"
        })
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        product
    })
});

// Delete Product

exports.DeleteProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id)

    if (!product) {
        return res.status(500).json({
            success: false,
            message: "Product not found"
        })
    }

    await product.deleteOne();

    res.status(200).json({
        success: true,
        message: "Product deleted successfully"
    })
})

// Create new Review or update the Review

exports.createProductReview = catchAsyncErrors(async (req, res, next) => {

    const { rating, comment, productId } = req.body

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
        productId
    };

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(rev => rev.user.toString() === req.user._id.toString())

    if (isReviewed) {
        product.reviews.forEach(rev => {
            if (rev.user.toString() === req.user._id.toString());
            rev.rating = rating,
                rev.comment = comment
        })
    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length
    }

    // Average rating
    let avg = 0;

    product.reviews.forEach(rev => {
        avg += rev.rating
    })

    product.ratings = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true
    });
});

// Get All Reviews of a product

exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 400));
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews,

    })
});

// Delete Reviews

exports.deleteReviews = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);

    if (!product) {
        return next(new ErrorHandler("Product not found", 400));
    }

    const reviews = product.reviews.filter(rev => {
        return rev._id.toString() !== req.query.id.toString();
    });

    let avg = 0;

    reviews.forEach(rev => {
        avg += rev.rating;
    });

    let ratings = 0;

    if (reviews.length === 0) {
        ratings = 0;
    } else {
        ratings = avg / reviews.length;
    }

    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(
        req.query.productId,
        {
            reviews,
            ratings,
            numOfReviews
        },
        {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        }
    );

    res.status(200).json({
        success: true
    });
});
