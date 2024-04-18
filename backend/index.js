const express = require("express");
const mainRouter = require("./routes/index")
const cors = require("cors");
require('dotenv').config()

const app= express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => {
    console.log("Hello");
    return res.status(200).send("Hello from the server!");
})

app.use("/api/v1",mainRouter)
 
app.get('*', function (req, res) {
    res.status(404).json({ message: "Route Not Found!" });
});

app.listen(PORT ,()=>{
    console.log(`Server running on ${PORT}`)
})