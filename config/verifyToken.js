import expressAsyncHandler from "express-async-handler";
import mysql from 'mysql2/promise'
import axios from 'axios'
import getBillInfoAfetrPayment from "./getBillAfterPayment.js";
import  jwt from 'jsonwebtoken'

const verifiyTokenMiddelware = expressAsyncHandler(async (req, res, next) => {
    // console.log("form tokin verify")
    // console.log(req.body)
    // console.log('**************')

 try {
     const vtoken = jwt.verify(req.body.token, process.env.TOKEN_SECRET)
  
     if (vtoken.ContractNo == req.body.ContractNo) {
        //  console.log("next route")
    // console.log("Token verified request page")

         next()
     }
 } catch (error) {
     res.status(402).send("authorization required")
     return
 }

})
export default verifiyTokenMiddelware

