import expressAsyncHandler from "express-async-handler";
import mysql from 'mysql2/promise'
import axios from 'axios'
import getBillInfoAfetrPayment from "./getBillAfterPayment.js";
import  jwt from 'jsonwebtoken'

const verifiyTokenMiddelware=expressAsyncHandler(async(req,res,next)=>{
 try {
     const vtoken = jwt.verify(req.body.token, process.env.TOKEN_SECRET)
  
     if (vtoken.ContractNo == req.body.ContractNo) {
         console.log("next route")
         next()
     }
 } catch (error) {
     res.status(402).send("authorization required")
     return
 }

})
export default verifiyTokenMiddelware

