import expressAsyncHandler from "express-async-handler";
import mysql from 'mysql2/promise'

const updateMiddleWare=expressAsyncHandler(async(req,res,next)=>{

    const ContractNo=req.body.ContractNo
    await axios.post('chapa post request').then((res)=>{
        
    })

next()


})
export default updateMiddleWare

