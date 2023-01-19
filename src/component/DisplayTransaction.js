import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import styles from '../css/style.module.css';
import TransactionDetail from '../pages/TransactionDetail';
import TransactionPaginate from './TransactionPaginate';



function DisplayTransaction() {

    const [transactionList, setTransactionList] = useState([]);
    const [selectValue, setSelectValue] = useState(0);
    // const [sort, setSort] = useState([])
    console.log("selectValue", selectValue);

    useEffect(()=> {
        Axios.get("http://localhost:3001/transaction/show",).then((response)=>{
          setTransactionList(response.data)
        })
      }, []);


      useEffect(()=>{
        if(selectValue == 0) {
          setTransactionList([...transactionList].sort((a,b)=> a.transaction_id> b.transaction_id ? -1 : 1))
        }
        if(selectValue == 1) {
          setTransactionList([...transactionList].sort((a,b)=> a.transaction_id> b.transaction_id ? 1 : -1))
        }
        // if(selectValue == 2) {
        //   setTransactionList([...transactionList].sort((a,b)=> a.transaction_id> b.transaction_id ? -1 : 1))
        // }
        if(selectValue == 2) {
          setTransactionList([...transactionList].sort((a, b)=> a.totalSoldQty> b.totalSoldQty ? 1 : -1))
        }
        if(selectValue == 3) {
          setTransactionList([...transactionList].sort((a, b)=> a.totalSoldQty> b.totalSoldQty ? -1 : 1))
        }
        if(selectValue == 4) {
          setTransactionList([...transactionList].sort((a, b)=> a.totalSoldPrice> b.totalSoldPrice ? 1 : -1))
        }
        if(selectValue == 5) {
          setTransactionList([...transactionList].sort((a, b)=> a.totalSoldPrice> b.totalSoldPrice ? -1 : 1))
        }

      }, [selectValue]);



      // console.log("sort", sort)

      const soldProducts = transactionList.map(product => JSON.parse(product.soldProducts));
      console.log("soldProducts",(soldProducts));


      const perTransactionQty = transactionList.map(product => product.totalSoldQty);
      console.log("qty", perTransactionQty);

      const totalTransactionQty = (perTransactionQty.reduce((total, qty) =>total+qty,0).toFixed(2));
      console.log("totalTransactionQty", totalTransactionQty); 


      const perTransactionPrice = transactionList.map(product => product.totalSoldPrice);
      console.log("price", perTransactionPrice);

      const totalTransactionPrice = (perTransactionPrice.reduce((total, price) =>total+price,0).toFixed(2));
      console.log("totalTransactionPrice", totalTransactionPrice); 

      const transactionLenght = transactionList.length;
      console.log("transactionLenght", transactionLenght)

  return (


      <> 
      <main className={styles.mainTransactionDisplay}>
        <header className={styles.headerTransactionDisplay}>
          {/* <h4 className='ms-3 m-0'>TRANSACTIONS</h4> */}
          <div className='d-flex justify-content-center align-items-center ms-3'>
            <p className='m-0 p-0'>NUMBER OF TRANSACTIONS: </p>
            <h6 className='m-0 p-0 ms-2'>{transactionLenght} </h6>
          </div>
          <div className='d-flex justify-content-center align-items-center'>
            <p className='m-0 p-0'>SOLD QTY: </p>
            <h6 className='m-0 p-0 ms-2'>{totalTransactionQty} PCS</h6>
          </div>
          <div className='d-flex justify-content-center align-items-center'>
            <p className='m-0 p-0'>SOLD AMOUNT:</p>
            <h6 className='m-0 p-0 ms-2'>&#8369; {totalTransactionPrice}</h6>
          </div>
          <form className="d-flex">
              <select id='sortTable' onChange={(event)=>setSelectValue(event.target.value)} className={styles.sortTransaction}>
                <option value="0">sort by Transaction ID &#8595;</option>
                <option value="1">sort by Transaction ID &#8593;</option>
                <option value="2">sort by Sold QTY &#8593;</option>
                <option value="3">sort by Sold QTY &#8595;</option>
                <option value="4">sort by Sold Price &#8593;</option>
                <option value="5">sort by Sold Price &#8595;</option>
              </select>
            </form>

        </header>
            <TransactionPaginate data={transactionList} transactionLenght= {transactionLenght} totalTransactionQty={totalTransactionQty} totalTransactionPrice={totalTransactionPrice}/>
        </main>
      </>  

  )
}

export default DisplayTransaction
