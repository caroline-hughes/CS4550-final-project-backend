import mongoose from "mongoose";
import express from 'express'
import cors from 'cors'
import UserController from "./controllers/users/users-controller.js"

const app = express()
app.use(cors())
app.use(express.json())

UserController(app)

app.listen(process.env.PORT || 4000);

console.log('\n\n up and running! \n\n')

// const CATS_DB_CONNECTION_STRING = "mongodb+srv://carolinehughes:meat6328@cluster0.wbex4bi.mongodb.net/cats?retryWrites=true&w=majority"
// const CONNECTION_STRING = 'mongodb://localhost:27017/'
const CONNECTION_STRING = process.env.CATS_DB_CONNECTION_STRING || 'mongodb://localhost:27017/cats'
// process.env.MY_DB_CONNECTION_STRING
console.log('process.env.CATS_DB_CONNECTION_STRING = ')
console.log(process.env.CATS_DB_CONNECTION_STRING)

console.log('using CONNECTION STRING')
console.log(CONNECTION_STRING)

mongoose.connect(CONNECTION_STRING)