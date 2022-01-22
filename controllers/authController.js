import catchAsyncErrors from '../middlewares/catchAsyncErrors';
import User from '../models/user';
import cloudinary from 'cloudinary';
import ErrorHandler from '../utils/errorHandler';
import absoluteUrl from 'next-absolute-url';
import sendEmail from './../utils/sendEmail';
import crypto from 'crypto';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_SECRET_KEY
})




const registerUser = catchAsyncErrors(async (req, res) => {
    const {name, email, password} = req.body;
    let findUser = await User.findOne({email})
    if(findUser) {
        return  res.status(400).json({message: 'Such a user already exists'})
    }

    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: 'bookit/avatars',
        width: '150',
        crop: 'scale'
    })

   console.log(result);
    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: result.public_id,
            url: result.url
        }
    });

    res.status(200).json({
        success: true,
        message: 'Account Registered successfully'
    })
})


const currentUserProile = catchAsyncErrors(async (req, res) => {
    //console.log('req ', req.user);
    const user = await User.findById(req.user._id);

    res.status(200).json({
        success: true,
        user
    })
})

const updateUserProile = catchAsyncErrors(async (req, res) => {
    //console.log('req ', req.user);
    const user = await User.findById(req.user._id);

    if(user) {
        user.name = req.body.name;
        user.email = req.body.email;

        if(req.body.password) user.password = req.body.password
    }

    // update avatar
    if(req.body.avatar !== '') {
        const public_id = user.avatar.public_id;

        await cloudinary.v2.uploader.destroy(public_id);

     const res = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: 'bookit/avatars',
            width: '150',
            crop: 'scale'
        })

        user.avatar = {
            public_id: res.public_id,
            url: res.secure_url,
        }
    }

    await user.save();

    res.status(200).json({
        success: true,
    })
})

const forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({email: req.body.email});

    if(!user) {
        return next(new ErrorHandler('User not found with this email', 404));
    }

    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false});

    const {origin} = absoluteUrl(req);

    const resetUrl = `${origin}/password/reset/${resetToken}`;

    const message = `Your password reset url is as follow: \n${resetUrl}\nif you have not requested this email, then ignore it.`

    try {
        await sendEmail({
            email: user.email,
            subject: 'BookIT Password Recovery',
            message
        })

        res.status(200).json({
            success: true,
            message: `Email sent to: ${user.email}`
        })
    } 
    

    catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({validateBeforeSave: false});

        return next(new ErrorHandler(error.message, 500))
    }



})



const resetPassword = catchAsyncErrors(async (req, res, next) => {

  const resetPasswordToken =  crypto.createHash('sha256').update(req.query.token).digest('hex');

  const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now()}
    });


    if(!user) {
        return next(new ErrorHandler('Password reset token is invalid or has been expired', 400));
    }

    if(req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler('Password does not match', 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({
        success: true,
        message: 'Password updated successfully'
    })

})

const getAdminUsers = catchAsyncErrors(async (req,res) => {

    const users = await User.find();

    res.status(200).json({
        success: true,
        users
    })

})


const getUserDetails = catchAsyncErrors(async (req,res) => {
    const user = await User.findById(req.query.id);


    if(!user) {
        return next(new ErrorHandler('User not found with this ID.', 400));
    }

    res.status(200).json({
        success: true,
        user
    })

});

const updateUser = catchAsyncErrors(async (req,res) => {
   
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }

    await User.findByIdAndUpdate(req.query.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });


    res.status(200).json({
        success: true
    })

   
});


const deleteUser = catchAsyncErrors(async (req,res) => {
   
    
    const user = await User.findById(req.query.id);

    if(!user) {
        return next(new ErrorHandler('User not found with this ID.', 400));
    }

    const image_id = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(image_id);


    await user.remove();

    res.status(200).json({
        success: true
    })

   
});




export {
    registerUser,
    currentUserProile,
    updateUserProile,
    forgotPassword,
    resetPassword,
    getAdminUsers,
    getUserDetails,
    updateUser,
    deleteUser
}