 const JWT = require("jsonwebtoken");


 const auth_middleware = async(req,res,next) => {
    try{
        const token = req.headers["authorization"].split(" ")[1]; // in authorization we add token after Bearer that's why split and get second value which is token
        console.log(req.headers["authorization"].split(" "));
        JWT.verify(token,process.env.JWT_SECRET ,(err,decode)=>{
            if(err){
                return res.status(401).send({ // 401 means unauthorized

                    success:false,
                    message:"Auth Failed", 
                });
            }
            else{
                req.body.userId = decode.userId;
                next();
            }
            });
        }
    
    catch(error) {
        console.log(error);
        return res.status(401).send({ // 401 means unauthorized
           success:false,  
           error,
           message:"Auth Failed" ,
        })

    }
};
 module.exports = auth_middleware;

    
 