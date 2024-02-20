import expressAsyncHandler from "express-async-handler";
import mysql from 'mysql2/promise'
import axios from 'axios'
import request from 'request';

const requestPayment = expressAsyncHandler(async (req, res) => {

    const api=process.env.CHAPA_API_KEY

    // const config = {
    //     headers: {
    //         Authorization: `Bearer ${api}`
    //     }
     
    // }


    // const data={
    //     phone_number: '0934680311',
    //     amount: req.body.amount,
    //     currency: 'ETB',
    //     first_name: req.body.customerName,
    //     last_name: req.body.ContractNo,
    //     tx_ref: req.body.tx_ref,
    //     callback_url: process.env.CHAPA_CALLBACK_URL,
        
        
    // }
    // const jsonData = JSON.stringify(data);
  try {
    // const response = await axios.post(process.env.CHAPA_PAYMENT_URL, jsonData, config)
    
    // if (response.status == 200 && response.data.status == "success") {
    //   res.status(200).send(response.data)
    // }

    // else res.status(404).send("error in the request")

    //begin
    var options = {
      'method': 'POST',
      'url': 'https://api.chapa.co/v1/transaction/initialize',
      'headers': {
        'Authorization': `Bearer ${api}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "amount": req.body.amount,
        "currency": "ETB",
        "first_name": req.body.customerName,
        "last_name": req.body.ContractNo,
        "tx_ref": req.body.tx_ref,
        "callback_url": process.env.CHAPA_CALLBACK_URL,
        "customization[title]": process.env.ENTERPRISE_NAME,
        "customization[description]": process.env.ENTERPRISE_DESC
      })

    };
    request(options, function (error, response) {
      if (error) {
        res.status(404).send("error in the request")
        console.log("host not reachable")
      } else {
        const decodedData = JSON.parse(response.body);
        const checkout_url = decodedData.data['checkout_url']
        // console.log(checkout_url);
        res.status(200).send(checkout_url)
      }
    });
    //end
  }
  catch (err) {
   res.status(404).send("error in the request")
  }


})
export default requestPayment


/**
 * 
 *   try {
  

    var options = {
      'method': 'POST',
      'url': 'https://api.chapa.co/v1/transaction/initialize',
      'headers': {
        'Authorization': `Bearer ${api}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "amount": req.body.amount,
        "currency": "ETB",
        "first_name": req.body.customerName,
        "last_name": req.body.ContractNo,
        "tx_ref": req.body.tx_ref,
        "callback_url": process.env.CHAPA_CALLBACK_URL,
        "customization[title]": process.env.ENTERPRISE_NAME,
        "customization[description]": process.env.ENTERPRISE_DESC
      })

    };
    request(options, function (error, response) {
      if (error) throw new Error(error);
      const decodedData = JSON.parse(response.body);
      const checkout_url = decodedData.data['checkout_url']
      // console.log(checkout_url);
      res.status(200).send(checkout_url)
    });
  
} catch (error) {
 throw error
}
**/