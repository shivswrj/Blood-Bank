const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const morgan = require("morgan")
const connectdb = require("./config/db")
dotenv.config()


//mongodb connection
connectdb();


const app = express();

//middlewares
app.use(cors())
app.use(express.json())
app.use(morgan("dev")) // will give info about the url , time it takes on console

app.use("/api/v1/test" , require("./routes/testRoutes"));



//port
const PORT = process.env.PORT || 8080;

//listen

app.listen(PORT , () => {
    console.log(`Node Server Running In ${process.env.DEV_MODE} On Port ${process.env.PORT}`);
});