import express from 'express'
import searchedData from '../controllers/getSerchedData.js'
import updateBillStatus from '../controllers/updateUser.js'
import updateMiddleWare from '../config/updatemiddleware.js'
import requestPayment from '../controllers/requestPayment.js'
import verifiyTokenMiddelware from '../config/verifyToken.js'
const router=express.Router()
router.get('/',(req,res)=>{
    res.send("welcome to the online bill payment api ")
})

//get single data

router.post('/get_bill_info',searchedData)
router.post('/request_payment',verifiyTokenMiddelware, requestPayment)
router.post('/update_bill_status',updateMiddleWare,updateBillStatus)





export default router