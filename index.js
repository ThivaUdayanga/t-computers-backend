import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import userRouter from './router/userRouter.js'
import productRouter from './router/productRouter.js'
import Autherization from './lib/jwtMiddleware.js'
import dotenv from 'dotenv'

dotenv.config()

const mongoURI = process.env.MONGO_DB_URI

mongoose.connect(mongoURI).then(
    ()=>{
        console.log("Connected to MongoDB")
    }
).catch(
    ()=>{
        console.log("Error connecting to MongoDB")
    }
)

const app = express()

app.use(cors())

app.use(express.json())     // Middleware to parse JSON bodies

//middlewhere for autherization
app.use(Autherization)

app.use('/api/users', userRouter)
app.use('/api/product', productRouter)

app.listen(5001, 
    ()=> {
        console.log("Server started")
    }
)