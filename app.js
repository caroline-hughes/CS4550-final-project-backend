import mongoose from "mongoose";
import express from 'express'
import cors from 'cors'
import UserController from "./controllers/users/users-controller.js"

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  autoIndex: false,
  maxPoolSize: 10,
  socketTimeoutMS: 45000,
  family: 4
}

const CONNECTION_STRING = process.env.CATS_DB_CONNECTION_STRING || 'mongodb://localhost:27017/cats'

// console.log('process.env.CATS_DB_CONNECTION_STRING = ')
// console.log(process.env.CATS_DB_CONNECTION_STRING)
// console.log('using CONNECTION STRING')
// console.log(CONNECTION_STRING)

mongoose.connect(CONNECTION_STRING, options)


const app = express()
app.use(cors())
app.use(express.json())
UserController(app)

app.listen(process.env.PORT || 4000);

console.log('\n\n up and running! \n\n')
