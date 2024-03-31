import expressAsyncHandler from "express-async-handler";
import axios from 'axios'
const requestPayment = expressAsyncHandler(async (req, res) => {
  const api = process.env.CHAPA_API_KEY

  const config = {
    headers: {
      Authorization: `Bearer ${api}`
    }

  }
  const name = req.body.customerName.replace(/\s/g, '') + req.body.ContractNo
  const data = {
    email: `${name}@gmail.com`,
    currency: 'ETB',
    amount: '1',
    tx_ref: req.body.tx_ref,
  };
  try {
    const response = await axios.post(process.env.CHAPA_PAYMENT_URL, data, config)
    if (response.status == 200 && response.data.status == "success") {
      res.status(200).send(response.data['data']['checkout_url'])
    }
    else res.status(404).send("error in the request")
  }
  catch (err) {
    res.status(404).send("error in the request")
  }


})
export default requestPayment


