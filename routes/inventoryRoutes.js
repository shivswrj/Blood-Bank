const express = require("express");
const {addInventoryController , getInventoryController, getDonarsController,getShowHospital} = require("../controllers/inventoryController");
const authMiddleware = require("../middlewares/authMiddleware");



const router = express.Router();

//routes

//add inventory || post
router.post("/add-inventory" , authMiddleware, addInventoryController);


//get all blood records
router.get('/get-inventory', authMiddleware,getInventoryController);

//get all donars records
router.get('/get-donars', authMiddleware,getDonarsController);

//get all donars records
router.get('/show-hospital', authMiddleware,getShowHospital);

module.exports = router;