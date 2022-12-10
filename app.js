import mongoose from "mongoose";
import express from 'express'
import cors from 'cors'
import UserController
  from "./controllers/users/users-controller.js"

const app = express()
app.use(cors())
app.use(express.json())

UserController(app)

app.listen(process.env.PORT || 4000);

const MY_DB_CONNECTION_STRING = "mongodb+srv://carolinehughes:meat6328@cluster0.wbex4bi.mongodb.net/tuiter?retryWrites=true&w=majority"

const CONNECTION_STRING = MY_DB_CONNECTION_STRING || 'mongodb://localhost:27017/tuiter'
  // process.env.MY_DB_CONNECTION_STRING
  
mongoose.connect(CONNECTION_STRING)