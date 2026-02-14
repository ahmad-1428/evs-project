// // controllers/userController.js
// import asyncHandler from 'express-async-handler';
// import User from '../models/userModel.js';

// const updateUserProfile = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.user._id);

//   if (user) {
//     user.name = req.body.name || user.name;
//     user.email = req.body.email || user.email;
//     user.phone = req.body.phone || user.phone;
//     user.address = req.body.address || user.address;
//     user.gender = req.body.gender || user.gender;
//     user.image = req.body.image || user.image;

//     const updatedUser = await user.save();
//     res.json({
//       _id: updatedUser._id,
//       name: updatedUser.name,
//       email: updatedUser.email,
//       phone: updatedUser.phone,
//       address: updatedUser.address,
//       gender: updatedUser.gender,
//       image: updatedUser.image,
//       token: generateToken(updatedUser._id), // if you return token
//     });
//   } else {
//     res.status(404);
//     throw new Error('User not found');
//   }
// });
