const express = require("express");
const userController = require("../controllers/userController.js");
const authMiddleware = require("../middleware/authMiddleware.js");
const userRouter = express.Router();

userRouter.get("/allUsers", userController.getAllUsers);
userRouter.post("/signup", userController.signup);
userRouter.post("/login", userController.login);
userRouter.get("/userProfile", authMiddleware,userController.getUserProfile);
userRouter.put("/updateProfile/:id",authMiddleware ,userController.updateUserProfile);
userRouter.delete("/deleteProfile/:id",authMiddleware ,userController.deleteUserProfile);

module.exports = userRouter;
