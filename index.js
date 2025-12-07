import express from 'express'
import mongoose from 'mongoose'
import userRouter from './router/userRouter.js'
import productRouter from './router/productRouter.js'
import Autherization from './lib/jwtMiddleware.js'

const mongoURI = "mongodb+srv://admin:1234@cluster0.m1okcln.mongodb.net/?appName=Cluster0"

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

app.use(express.json())     // Middleware to parse JSON bodies

//middlewhere for autherization
app.use(Autherization)

app.use('/users', userRouter)
app.use('/product', productRouter)

app.listen(5000, 
    ()=> {
        console.log("Server started")
    }
)