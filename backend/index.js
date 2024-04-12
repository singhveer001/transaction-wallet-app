const express = require("express");
const mainRouter = require("./routes/index")
const cors = require("cors");
require('dotenv').config()
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;
const app= express();
const mainRouter = require("./routes/index")

app.use("/api/v1",mainRouter)
 
app.listen(PORT ,()=>{
    console.log(`Server running on ${PORT}`)
})