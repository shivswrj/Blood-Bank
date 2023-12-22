const express = require("express");
const { 
    registerController, loginController } = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");



const router = express.Router();
//routes
//Register || post
router.post("/register", registerController);
//login || post
router.post("/register", loginController);

//GET CURRENT USER || GET 

router.get('/current-user',authMiddleware, currentUserController);



module.exports = router;
