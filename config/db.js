const mongoose = require("mongoose")

const connectdb = async () => {
    try{

        await mongoose.connect(process.env.mongodb_url);
        console.log(`Connected to MongoDB database ${mongoose.connection.host}`);

    }
    catch(error){
        console.log(`Error database connectivity failed!! ${error}`)
    }
}


module.exports = connectdb