import expressAsyncHandler from "express-async-handler";
import mysql from 'mysql2/promise'

const getBillInfoAfetrPayment=expressAsyncHandler(async( ContractNo)=>{

 

    const pool = mysql.createPool({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
      });
    const [rows, fields] = await pool.query(`SELECT * FROM online_bills  where ContractNo=?`,[ContractNo]).finally(()=>{
       pool.end()
    });

    if(rows.length>0){
      const sendData={
        ContractNo:rows[0].ContractNo,
        prevTotal:rows[0].prevMRate+rows[0].prevPenality+rows[0].prevTariff,
        totalCost:rows[0].totalCost,
            }
      return sendData

    }
    else return null

})
export default getBillInfoAfetrPayment;