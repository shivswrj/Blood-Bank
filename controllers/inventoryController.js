const inventorymodel = require("../models/inventoryModel");
const usermodel = require("../models/userModel");
const mongoose = require('mongoose')
const addInventoryController = async (req,res)=>{
    try{
        const email = req.body.email ;
        const inventorytype = req.body.inventoryType;
        const user = await usermodel.findOne({ email });
        const currentuser = await usermodel.findOne({email:email});
        //checking errors
        if(!currentuser){
            return res.status(400).send({
                success:false,
                message:"User not found",
            })
        }

        if(inventorytype ==="in" && currentuser.role !="donar"){
           return res.status(400).send({
               success:false,
                message:"Not a donar account",
           })   
        }
        if(inventorytype === "out" && currentuser.role !="hospital"){
            return res.status(400).send({// status code 400 means cannot find the request ( doesn't indicates whether the absense if temporary or permanaet) and error occured by user
                success:false,
                message:"Not an hospital account",
            })
        }
        //Calculating Record
        if(inventorytype === "out"){
            console.log("OUT");
            const bloodGroup = req.body.bloodGroup;
            const quantity = req.body.quantity;
            const blood = await inventorymodel.findOne({inventoryType:"in",bloodGroup:bloodGroup,quantity:{$gte:quantity}});
            console.log(blood);
            if(blood){
                console.log("YUP Available Blood Group");
                // blood.quantity = blood.quantity - quantity;
                // if(blood.quantity === 0){
                //     await inventorymodel.deleteOne({ _id: blood._id });
                //     console.log("REMOVED")
                // }
                // else{
                //     await blood.save();
                // }
                
            }
            else{
                console.log("NOT Available Group");
                return res.status(400).send({
                    success:false,
                    message:"NOT AVAILABLE",
                })
            }
            req.body.hospital = user?._id;
        }
        else{
            req.body.donar = user?._id;
        }

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
        const inventory = await inventorymodel.find({organisation: req.body.userId});
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


const getShowHospital = async (req,res)=>{
    try {
        const bloodGroups = ["O+", "O-", "AB+", "AB-", "A+", "A-", "B+", "B-"];
        const bloodGroupData = [];
        const organisation = new mongoose.Types.ObjectId(req.body.userId);
        const org_name = (await usermodel.find({ '_id': organisation.toString() }))[0].organisationName;
        console.log(org_name);
        //get single blood group
        await Promise.all(
            bloodGroups.map(async (bloodGroup) => {
                //COunt TOTAL IN
                const totalIn = await inventorymodel.aggregate([
                    {
                    $match: {
                        bloodGroup: bloodGroup,
                        inventoryType: "in",
                        organisation: organisation.toString(),
                    },
                    },
                    {
                    $group: {
                        _id: null,
                        total: { $sum: "$quantity" },
                    },
                    },
                ]);
                //COunt TOTAL OUT
                const totalOut = await inventorymodel.aggregate([
                    {
                    $match: {
                        bloodGroup: bloodGroup,
                        inventoryType: "out",
                        organisation: organisation.toString(),
                    },
                    },
                    {
                    $group: {
                        _id: null,
                        total: { $sum: "$quantity" },
                    },
                    },
                ]);
                //CALCULATE TOTAL
                const availabeBlood =
                    (totalIn[0]?.total || 0) - (totalOut[0]?.total || 0);
        
                //PUSH DATA
                bloodGroupData.push({
                    bloodGroup,
                    totalIn: totalIn[0]?.total || 0,
                    totalOut: totalOut[0]?.total || 0,
                    availabeBlood,
                    org_name
                    
                });

                
                })
                
        );
        
        console.log(bloodGroupData);
        return res.status(200).send({
          success: true,
          message: "Blood Group Data Fetch Successfully",
          bloodGroupData,
        });
      } catch (error) {
        console.log(error);
        return res.status(500).send({
          success: false,
          message: "Error In Bloodgroup Data",
          error,
        });
      }
};


  
    
//GET DONAR RECORDS
const getDonarsController = async (req, res) => {
    try {
      const organisation = req.body.userId;
      console.log("organisation",organisation);
      const donorId = await inventorymodel.distinct("donar", {
        organisation,
      });

      console.log("donarid",donorId);
      const donars = await usermodel.find({ _id: { $in: donorId } });
      console.log("donars");
      console.log(donars);
      return res.status(200).send({
        success: true,
        message: "Donar Record Fetched Successfully",
        donars,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        success: false,
        message: "Error in Donar records",
        error,
      });
    }
  };
  


module.exports = {addInventoryController , getInventoryController,getDonarsController,getShowHospital};