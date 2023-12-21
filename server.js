const express = require('express');

//rest object
const app = express();

//routes
//1 test route
//this will act as a middleware we r using app.use instead of app.get

app.use("/api/v1/test" , require("./routes/testRoutes"));

//port
const PORT = 8080;

//listen

app.listen(PORT , () => {
    console.log('Node Server Running');
});