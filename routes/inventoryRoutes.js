const express = require("express");
const {addInventoryController , getInventoryController} = require("../controllers/inventoryController");
const authMiddleware = require("../middlewares/authMiddleware");



const router = express.Router();

//routes

//add inventory || post
router.post("/add-inventory" , authMiddleware, addInventoryController);


//get all blood records
router.get('/get-inventory', authMiddleware,getInventoryController);



module.exports = router;