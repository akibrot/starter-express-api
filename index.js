import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import router from './routes/router.js'
dotenv.config()
const port=process.env.PORT || 3000
const app=express()
app.use(express.json({limit:"50mb"}))
app.use(cors())

app.listen(port,()=>{
    console.log("app started in port "+port)


})
app.use(router)