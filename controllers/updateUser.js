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
    const [rows, fields] = await pool.query(`Update  online_bills set billStatus=?  where ContractNo=?`,['SOLD',ContractNo]).finally(()=>{
       pool.end()
    });
    

    if(rows[0]){


    }
    else res.send("No data found")


})
export default updateBillStatus

