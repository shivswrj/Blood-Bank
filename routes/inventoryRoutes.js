const express = require("express");


const authMiddleware = require("../middleware/authMiddleware");
const { 
    createInventoryController, getInventoryController, 
 } = require("../controllers/inventoryController");


const router = express.Router();

//routes

//add inventory || post

router.post("/create-inventory" , authMiddleware, createInventoryController);


//get all blood records
router.get('/get-inventory', authMiddleware,getInventoryController);



module.exports = router;