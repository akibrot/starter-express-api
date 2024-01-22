import expressAsyncHandler from "express-async-handler";
import mysql from 'mysql2/promise'

const searchedData = expressAsyncHandler(async (req, res) => {
  // console.log(req.body)
  const ContractNo = req.body.ContractNo

  const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });
  const [rows, fields] = await pool.query(`SELECT * FROM online_bills  where ContractNo=?`, [ContractNo]).finally(() => {
    pool.end()
  });

  if (rows.length > 0) {
    const sendData = {

      ContractNo: rows[0].ContractNo,
      billStatus: rows[0].billStatus,
      custID: rows[0].custID,
      customerName: rows[0].customerName,
      prevTotal: rows[0].prevMRate + rows[0].prevPenality + rows[0].prevTariff,
      readingCurrent: rows[0].readingCurrent,
      readingPrev: rows[0].readingPrev,
      readingCons: rows[0].readingCons,
      totalCost: rows[0].totalCost,
      invoiceNo: rows[0].invoiceNo,
      monthIndex: rows[0].monthIndex,
      fiscalYear: rows[0].fiscalYear

    }
    res.send(sendData)

  }
  else res.send(null)


})
export default searchedData

