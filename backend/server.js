// modules

const express = require("express")

const mongoose = require("mongoose")
const authRouter = require("../backend/routes/authRoutes")
const userRouter = require("../backend/routes/userRoutes")
const partyRouter = require("../backend/routes/partyRoutes")

const cors = require("cors")
const bodyParser = require("body-parser")
const User = require("./models/user")

//routes

// middleware

const dbName = "woopxzevent"

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static("public"));

// mongodb conection

mongoose.connect(
    `mongodb://localhost:27017/${dbName}`,
    {
        
    }
)


// atrelar roas  no express 
app.use("/api/auth" , authRouter);

app.use("/api/user" , userRouter);
app.use("/api/party" , partyRouter);


app.listen((3000) , ()=>{
    console.log("o backend esta rodando na porta 3000")
})