import expressAsyncHandler from "express-async-handler";
import axios from 'axios'
import getBillInfoAfetrPayment from "./getBillAfterPayment.js";
import  jwt from 'jsonwebtoken'

const updateMiddleWare = expressAsyncHandler(async (req, res, next) => {
  const vtoken = jwt.verify(req.body.token, process.env.TOKEN_SECRET)
  const api=process.env.CHAPA_API_KEY
  const config = {
      headers: {
          Authorization: `Bearer ${api}`
      }
  }
  var ref = `ref-${req.body.tx_ref}`
  
  const response = await axios.get(`https://api.chapa.co/v1/transaction/verify/${ref}`, config);
    if(response.data.status==='success'){
      const ContractNo=vtoken.ContractNo;
      const totalCostChapa = response.data['data']['amount'];
      const paymentstate = response.data['data']['status'];

     const fromDb=await getBillInfoAfetrPayment(ContractNo)
    
      if (fromDb == null) {
      return
     }
     else if(paymentstate=='success' && totalCostChapa>=fromDb.totalCost && fromDb.fiscalYear==vtoken.fiscalYear && fromDb.monthIndex==vtoken.monthIndex){
       req.body.ContractNo = ContractNo;
      next()
     }
     else return

    }

})
export default updateMiddleWare

