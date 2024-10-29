const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");


// Create New Order
exports.newOrder = catchAsyncErrors(async (req,res,next) =>{
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id,
    });
    
    res.status(200).json({
        success: true,
        order,
    });

});

// Get Single Order
exports.getSingleOrder = catchAsyncErrors(async (req,res,next) => {
    const order = await Order.findById(req.params.id).populate(
        "user",
        "name email", // populate basically goes uses the user-id we get from Order details and searches in user database and returns the name and email 
    );
    if(!order){
        return next(new ErrorHandler(`Order not found with Id : ${req.params.id}`,404));
    }
    res.status(200).json({
        success: true,
        order,
    })
});

// Get Logged-In User Orders
exports.myOrders = catchAsyncErrors(async (req,res,next) => {
    const orders = await Order.find({user: req.user._id});

    res.status(200).json({
        success: true,
        orders,
    })
});

// Get All Orders -- Admin
exports.getAllOrders = catchAsyncErrors(async (req,res,next) => {
    const orders = await Order.find();

    let totalAmount =0;
    orders.forEach((rev) =>{
        totalAmount+= rev.totalPrice;
    });
    res.status(200).json({
        success: true,
        totalAmount,
        orders,
    });
});

exports.updateOrder = catchAsyncErrors(async (req,res,next) => {
    const order = await Order.findById(req.params.id);

    if(!order)
    {
        return next(new ErrorHandler(`Order Not Found With ID: ${req.params.id}`,400));
    }

    if(order.orderStatus == "Delivered"){
        return next(new ErrorHandler(`You Have Already Delivered This Order`,400));
    }
    if(req.body.status == "Shipped"){
        order.orderItems.forEach(async (o) => {
            await updateStock(o.product,o.quantity); // utility function given below :)
        });
    }
    order.orderStatus = req.body.status;
    if(req.body.status === "Delivered"){
        order.deliveredAt = Date.now();
    }
    await order.save({validateBeforeSave: false});
    res.status(200).json({
        success: true,
    });

});

//utility function in above function 
async function updateStock(id,quantity){
    const product = await Product.findById(id);

    product.Stock -= quantity;

    await product.save({validateBeforeSave: false});
}

//Delete Orders -- Admin

exports.deleteOrder = catchAsyncErrors(async (req,res,next)=>{
    const order = await Order.findById (req.params.id);
    
    if(!order){
        return next(new ErrorHandler(`Order Not Found With ID: ${req.params.id} `,400));
    }
    await order.deleteOne();

    res.status(200).json({
        success: true,
    })
});