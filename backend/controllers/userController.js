const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail")

// Register a user

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name, email, password,
    avatar: {
      public_id: "this is a sample id",
      url: "profilepicUrl"
    }
  });
  // const token = user.getJWTToken();
  // res.status(201).json({
  //     success:true,
  //     user,
  //     token
  // })
  sendToken(user, 201, res)
})

// Login user

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

<<<<<<< HEAD
    // checking if user has given password and email both
=======
  // checking if user has given password and email both
>>>>>>> 71d636c5c85ccb323282f8eba8e30437c8349eec

  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email & Password", 400))
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invaild email and password"))
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invaild email and password", 401));
  }
  // const token = user.getJWTToken();

  // res.status(200).json({
  //     success:true,
  //     token,
  //     user
  //  })

  sendToken(user, 200, res)

});

// Logout User

exports.logout = catchAsyncErrors(async (req, res, next) => {

  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  })
  res.status(200).json({
    success: true,
    message: "Logged out"
  })
})

// Forgot Password

// exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
//     try {
//         const user = await User.findOne({ email: req.body.email });

//         if (!user) {
//             return next(new ErrorHandler("User not found", 404));
//         }

//         // Get ResetPassword Token
//         const resetToken = user.getResetPasswordToken();

//         await user.save({ validateBeforeSave: false });

//         const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

//         const message = `Your password reset token is: ${resetPasswordUrl}\n\n If you have not requested this email then, please ignore it`;

//         await sendEmail({
//             email: user.email,
//             subject: `Ecommerce Password Recovery`,
//             message,
//         });

//         res.status(200).json({
//             success: true,
//             message: `Email sent to ${user.email} successfully`,
//         });
//     } catch (error) {
//         // Handle errors here
//         console.error(error);
//         next(error);
//     }
// }); 
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  // Get ResetPassword Token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/password/reset/${resetToken}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Ecommerce Password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

// Reset Password

exports.resetPassword = catchAsyncErrors(async (req, res, next) => {

  // creating token hash

  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorHandler("Reset Password Token is invalid or expired", 400))
  }

  if (req.body.password !== req.body.comparePassword) {
    return next(new ErrorHandler("Password does not match", 400))
  }

  user.password = req.body.password;
  user.resetPasswordExpire = undefined;
  user.resetPasswordToken = undefined;

  await user.save()
  sendToken(user, 200, res);

})

// Get user details

exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user
  })
});

// update user password

exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword, user.password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old password is incorrect", 401));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match", 400))
  }

  user.password = req.body.newPassword;

  await user.save()
  sendToken(user, 200, res)

});

// Update user profile

exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
 
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  }

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false
  });

  res.status(200).json({
    success: true,
  });
});

// Get all users (for admin)

exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users
  })
})


// Get singal user (for admin)

exports.getSingalUSer = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler(`User does not exist with id: ${req.params.id}`))
  }
  res.status(200).json({
    success: true,
    user
  });
})

// Update user role --Admin

exports.UpdateUserRole = catchAsyncErrors(async(req,res,next)=>{
  const userRoleData = {
    name:req.body.name,
    email:req.body.email,
    role:req.body.role
  }

  const user = await  User.findByIdAndUpdate(req.params.id,userRoleData,{
    new: true,
    runValidators:true,
    useFindAndModify:false
  });

  res.status(200).json({
    success:true,
  })

})

// Delete User --Admin

exports.deleteUser = catchAsyncErrors(async(req,res,next)=>{

  const user = await User.findById(req.params.id)

  if(!user){
    return next(new ErrorHandler(`User does not exist with id: ${req.params.id}`))
  }

  await user.deleteOne();

  res.status(200).json({
    success:true,
    message:"User Deleted Successfully"
  })
})