const express = require("express");
const { registerUser, loginUser, logout, forgotPassword ,resetPassword, getUserDetails, updatePassword, updateProfile, getSingleUserDetails, getAllUsers, updateUserRole, deleteUser} = require("../controller/userController");
const router = express.Router();
const { isAuthenticatedUser,authorizedRoles } = require("../middleware/auth");

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/logout").get(logout);

router.route("/password/forgot").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/me").get(isAuthenticatedUser,getUserDetails);

router.route("/password/update").put(isAuthenticatedUser,updatePassword);

router.route("/me/update").put(isAuthenticatedUser,updateProfile);

router.route("/admin/user").get(isAuthenticatedUser,authorizedRoles("admin"),getAllUsers);

// Admin actions on User Data
router.route("/admin/user/:id")
    .get(isAuthenticatedUser,authorizedRoles("admin"), getSingleUserDetails)
    .put(isAuthenticatedUser,authorizedRoles("admin"), updateUserRole)
    .delete(isAuthenticatedUser,authorizedRoles("admin"), deleteUser);

module.exports = router;



