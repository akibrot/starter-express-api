import expressAsyncHandler from "express-async-handler";
import mysql from 'mysql2/promise'
import axios from 'axios'

const requestPayment=expressAsyncHandler(async(req,res)=>{

    console.log(req.body)
    const api=process.env.CHAPA_API_KEY

    const config = {
        headers: {
            Authorization: `Bearer ${api}`
        }
     
    }

    const data={
        phone_number: '0934680311',
        amount: req.body.amount,
        currency: 'ETB',
        first_name: req.body.customerName,
        last_name: req.body.ContractNo,
        tx_ref: req.body.tx_ref,
        callback_url: process.env.CHAPA_CALLBACK_URL,
        
    }
    const response=await axios.post(process.env.CHAPA_PAYMENT_URL,data,config)
    if(response.status==200 && response.data.status=="success"){
        res.status(200).send(response.data)
    }

    else res.status(404).send("error in the request")

})
export default requestPayment

