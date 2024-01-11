import expressAsyncHandler from "express-async-handler";
import mysql from 'mysql2/promise'
import axios from 'axios'
import getBillInfoAfetrPayment from "./getBillAfterPayment.js";

const updateMiddleWare=expressAsyncHandler(async(req,res,next)=>{
  console.log("uppdate route")
  const api=process.env.CHAPA_API_KEY

  const config = {
      headers: {
          Authorization: `Bearer ${api}`
      }
  }

    var ref=`ref-${req.body.tx_ref}`
    // var ref='ref-11053330-20000'
    const headers={
        "Content-Type": "application/json",
      'Authorization': `Bearer ${process.env.CHAPA_API_KEY} `,
    }
    const response=await axios.get(`https://api.chapa.co/v1/transaction/verify/${ref}`,config);
    if(response.status===200 && response.data.status==='success'){
      console.log(response.data['data']['last_name'])
const ContractNo=response.data['data']['last_name'];
const totalCostChapa=response.data['data']['amount'];
     const fromDb=await getBillInfoAfetrPayment(ContractNo)
    console.log(fromDb)
     if(fromDb==null){
      return
     }
     else if(fromDb.totalCost==totalCostChapa){
      req.body.ContractNo=ContractNo;
      next()
     }
     else return

    }




})
export default updateMiddleWare

