const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


//controller for registration
const registerController = async (req, res) => {
  try {
    const exisitingUser = await userModel.findOne({ email: req.body.email })
  
    //checking if user exists or not 
    if (exisitingUser) {
      return res.status(200).send({  // 200 status means that the request was received and understood and is being processed
        success: false,
        message: "User Already exists",
      })
    }

    //hashing the password
    const salt = await bcrypt.genSalt(10); // 10 represents the processing power it takes to decrypt the password.
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;
    
    //adding the new data to userModel 
    const user = new userModel(req.body);
    await user.save();
    return res.status(201).send({ // 201 status means the request has succeeded and has led to the creation of a resource.
      success: true,
      message: "User Registerd Successfully!!!",
      user,
    })

  } catch (error) {
    console.log(error);
    res.status(400).send({ // 400 status means describes an error caused by an invalid request.
      success: false,
      message: "Error In Register API",
      error,
    })
  }
};



//controller for login
const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).send({  // 404 status means that server has not found anything related to the request send.
        success: false,
        message: "User not found",
      });
    }
    //check role 
    if(user.role !== req.body.role){
      return res.status(400).send({ // 400 status means that an error occured while processing the request or cannot find the request
      success:false,
      message:"role does not match" , 
      })
    }
    //compare password
    const comparePassword = await bcrypt.compare(req.body.password,user.password);// decrypt the hashed pasword (from user.password) and check with other
    if (!comparePassword) {
      return res.status(400).send({
        success: false,
        message: "Wrong Password",
      });
    }
    //creating token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d", //how long this token is valid ,  after one day user must again login
    });
    return res.status(200).send({ // 200 status means that the request was received and understood and is being processed
      success: true,
      message: "Login Successfully",
      token,
      user,
    });
  } 
  catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error In Login API",
      error
    });
  }
};

//controller for current user 
const currentUserController = async(req,res) => {
  try{
    const user = await userModel.findOne({_id:req.body.userId});
    return res.status(200).send ({ // 200 status means that the request was received and understood and is being processed
      success:true,
      message:"User Fetched Successfully" ,
      user
    });
  }
  catch(error) {
    console.log (error);
    return res.status(500).send({ // 500 status code means  the server encountered an unexpected condition that prevented it from fulfilling the request
      success:false,
      message:"unable to get current user",
      error
    });
  }
};


  

module.exports = { registerController,loginController, currentUserController };