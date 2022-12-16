import mongoose from "mongoose";
import dotenv from "dotenv";
import express from 'express'
import cors from 'cors'
import session from 'express-session'
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

dotenv.config();

console.log(process.env.CATS_DB_CONNECTION_STRING)
const CONNECTION_STRING = process.env.CATS_DB_CONNECTION_STRING || 'mongodb://localhost:27017/cats'

mongoose.connect(CONNECTION_STRING, options)

const app = express();
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))

app.use(session({
    secret: 'should be an environment variable',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

app.use(express.json())

UserController(app)
// app.listen(process.env.PORT || 4000);

app.listen(4000);
console.log('\n\n up and running! \n\n')
