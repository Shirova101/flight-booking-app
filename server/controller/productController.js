const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");

const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
//Create Product -- ADMIN

exports.createProduct = catchAsyncErrors(async (req,res,next) =>{

    req.body.user = req.user.id;

    const product = await Product.create(req.body);
    res.status(201).json({
        success:true,
        product
    })
});
// GET ALL PRODUCTS

exports.getAllProducts = catchAsyncErrors(async (req,res) =>{
    const resultPerPage = 5;

    const apifeature = new ApiFeatures(Product.find(),req.query).search().filter().pagination(resultPerPage);
    const products = await apifeature.query;
    
    res.status(200).json({
        success:true,
        products
    })
});

// UPDATE PRODUCT -- ADMIN
exports.updateProduct = catchAsyncErrors(async (req,res,next) =>{
    let product = await Product.findById(req.params.id);
    if(!product)
    {
        return next(new ErrorHandler("Product Not Found",404));
    }
    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });

    res.status(200).json({
        success:true,
        product
    })

});

// DELETE PRODUCT -- ADMIN

exports.deleteProduct = catchAsyncErrors(async(req,res,next) => {
    const product = await Product.findById(req.params.id);
    
    if(!product)
    {
        return next(new ErrorHandler("Product Not Found",404));
    }
    await product.deleteOne();
    res.status(200).json({
        success:true,
        message: "Product Deleted Successfully"
    })
});

// GET PRODUCT DETAILS
exports.getProductDetails = catchAsyncErrors(async (req,res,next) =>{
    const product = await Product.findById(req.params.id);
    
    if(!product)
    {
        return next(new ErrorHandler("Product Not Found",404));
    }
    res.status(200).json({
        success:true,
        product
    })

});

// CREATE NEW REVIEW OR UPDATE REVIEW //

exports.createProductReview = catchAsyncErrors( async (req,res,next) => {
    const {rating, comment , productId} = req.body;

    const review = {
        user: req.user._id,
        name:req.user.name,
        rating:Number(rating),
        comment,
    };

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(temp => temp.user.toString() === req.user._id.toString());

    if(isReviewed){
        product.reviews.forEach( temp => {
            if(temp.user.toString() == req.user._id.toString()){
                temp.rating = Number(rating);
                temp.comment = comment;
            }
        });
    }
    else{
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }
    let avg =0;
    product.reviews.forEach((temp) =>{
        avg +=temp.rating;
    });
    product.ratings = avg/product.reviews.length;

    await product.save({validateBeforeSave: false});

    res.status(200).json({
        success: true,
    })

});

// GET ALL REVIEWS OF A PRODUCT //

exports.getProductReviews = catchAsyncErrors( async (req,res,next) => {
    const product = await Product.findById(req.query.id);
    if(!product){
        return next(new ErrorHandler("Product Not Found", 404));
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews,
    })
});

// DELETE REVIEW //
exports.deleteReview = catchAsyncErrors(async (req,res,next) => {
    const product = await Product.findById(req.query.productId);

    if(!product){
        return next(new ErrorHandler("Product Not Found",404));
    }
    const reviews = product.reviews.filter((rev) => rev._id.toString() !== req.query.id.toString());
    let avg =0;
    reviews.forEach((rev) => {
        avg += rev.rating;
    });
    const ratings = avg/reviews.length;
    const numOfReviews = reviews.length;
    
    await Product.findByIdAndUpdate(req.query.productId,{
        reviews,ratings,numOfReviews,
    },{
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
        reviews
    });
});