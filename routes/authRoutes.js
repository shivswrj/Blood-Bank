const express = require("express");
const { registerController, loginController , currentUserController } = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

//Register || post request
router.post("/signup", registerController);
//login || post requet
router.post("/login", loginController);

//GET CURRENT USER || GET
router.get("/current-user",authMiddleware, currentUserController); //authmiddleware is used to protect routes



module.exports = router;
