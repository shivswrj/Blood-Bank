const inventorymodel = require("../models/inventoryModel");
const usermodel = require("../models/userModel");

const addInventoryController = async (req,res)=>{
    try{
        const {email , inventorytype } = req.body;
        const currentuser = await usermodel.findOne({email:email});
        //checking errors
        if(!currentuser){
            return res.status(400).send({
                success:false,
                message:"User not found",
                error
            })
        }
       if(inventorytype ==="in" && usermodel.role !="donar"){
           return res.status(400).send({
               success:false,
                message:"Not a donar account",
                error
           })   
        }
        if(inventorytype === "out" && usermodel.role !="hospital"){
            return res.status(400).send({// status code 400 means cannot find the request ( doesn't indicates whether the absense if temporary or permanaet) and error occured by user
                success:false,
                message:"Not an hospital account",
                error
            })
        }
        console.log("IAM")
        //saving inventory data to database
        const inventory = new inventorymodel(req.body);
        await inventory.save();
        return res.status(201).send({ // status code 201 means successful requests that create a new resource on the server
            success:true,
            message:"Inventory added successfully",
        })
    }
    catch(error){
        console.log(error);
        return res.status(400).send({
            success:false,
            message:"Adding Inventory was not successfull",
            error
        })
    }
};

const getInventoryController = async (req,res)=>{
    try{
        const inventory = await inventorymodel.find({organisation : req.body.userId});
        return res.status(201).send({ // status code 201 means successful requests that create a new resource on the server
            success:true,
            message:"Inventory Fetched successfully",
            id:req.body.userId,
            inventory
        })
    }
    catch(error){
        console.log(error);
        return res.status(400).send({// status code 400 means cannot find the request ( doesn't indicates whether the absense if temporary or permanaet) and error occured by user
            success:false,
            message:"Fetching Inventory was not successfull",
            error
        })
    }

};


module.exports = {addInventoryController , getInventoryController};