const express = require("express");
const { validateToken } = require("../middleware/validateTokenHandler");
const router = express.Router();
const { loginUser , registerUser, currentUser } = require("./../controllers/userController");

router.route("/login").post(loginUser);
router.route("/register").post(registerUser);

router.get('/current' , validateToken , currentUser) 

module.exports = router;
