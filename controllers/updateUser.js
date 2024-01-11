import expressAsyncHandler from "express-async-handler";
import mysql from 'mysql2/promise'

const updateBillStatus=expressAsyncHandler(async(req,res)=>{

    const ContractNo=req.body.ContractNo
    const pool = mysql.createPool({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
      });
    const update = await pool.query(`Update  online_bills set billStatus=?,soldID=?  where ContractNo=?`,['SOLD',process.env.ONLINE_AGENT_ID,ContractNo]).then((res)=>{
     const {changedRows}=res[0]
      console.log(changedRows)
     if(changedRows==1) {
res.status(200).json({message:"user updated"})
      }

    }).catch((err)=>{
      res.send(err)
    }).finally(()=>{
       pool.end()
    });

  return 


})
export default updateBillStatus

