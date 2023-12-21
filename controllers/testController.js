const testController = (req,res) => {
    res.status(200).send({
        message:"WELCOME" ,
        success:true,
    });
};

module.exports ={ testController };