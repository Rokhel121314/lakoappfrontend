import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import styles from '../css/style.module.css';
import Axios from 'axios';
import {useReactToPrint } from 'react-to-print';




function TransactionDetail() {

    const {id} = useParams();
    const transactionId = id;
    const [transactionData, setTransactionData] = useState([]);
    console.log("transactionId", transactionId);
    const componentRef = useRef();

    useEffect(()=> {
        Axios.get(`http://localhost:3001/transaction/show/${transactionId}`).then(response=> {
            setTransactionData(response.data)
        })
    }, [transactionId]);

    console.log("transactionData", transactionData);

    const cashPayment = transactionData?.map(product => product.cashPayment.toFixed(2))
    console.log("cashPayment", cashPayment);

    const paymentChange = transactionData?.map(product => product.paymentChange.toFixed(2))
    console.log("paymentChange", paymentChange);

    const soldProducts = (transactionData.map(product=> JSON.parse(product.soldProducts)))[0];

    console.log("soldProducts", soldProducts);

    
    const perTransactionPrice = transactionData.map(product => product.totalSoldPrice);
    console.log("price", perTransactionPrice);

    const totalTransactionPrice = (perTransactionPrice.reduce((total, price) =>total+price,0).toFixed(2));
    console.log("totalTransactionPrice", totalTransactionPrice); 

    const transactionDate = transactionData?.map(product => product.transactionDate);
    console.log("date", transactionDate);

    // const parsedSoldProduct = soldProducts[0];
    // console.log("parsedSoldProduct", parsedSoldProduct);

    // const productNames = soldProducts?.map(product=> product.productName);
    // console.log("productName", productNames);


    // const productNames = parsedSoldProduct.map(product => product.productName);
    // console.log("productName", productNames);

    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
    });

  return (
    <>

    <main className={styles.mainTransactionDetail}>
     
      <section className={styles.sectionTransactionDetail} ref={componentRef}>
        <header className={styles.headerTransactionDetail}>
          <p className='fs-2 p-0 m-0'>LAKO</p>
          <p className='m-0'>Address: #123 Dagupan City</p>
          <p className='m-0'>Contact #: 0912314566</p>
          <p className='m-0'>Date:{transactionDate}</p>
          <p className='m-0'>Transaction # {id}</p>
          <div className={styles.cashReceipt}>CASH RECEIPT</div>
        </header>
        <table className={styles.tableTransactionDetail}>
          <thead>
            <tr>
              <td className='ps-2 p-0'><h6>Description</h6></td>
              <td className='ps-2 p-0 text-start'><h6>Qty x Price</h6></td>
              <td className='ps-2 p-0 text-start'><h6>Price</h6></td>
            </tr>
          </thead>
          <tbody>
            {soldProducts?.map(product => {
              return (
                <tr key={product.transaction_id}>
                <td className='ps-2 p-0'>{(product.productName).slice(0,15)}</td>
                <td className='ps-2 p-0 text-start'>{product.sellQty} x &#8369;{product.resellPrice} </td>
                <td className='ps-2 p-0 text-start'>&#8369; {(product.sellQty*product.resellPrice).toFixed(2)}</td>
              </tr>
              )
            })}
          <tr className={styles.receiptSummary}>
            <td className='ps-2 p-0'><h6 className='m-0 mt-2'>TOTAL</h6></td>
            <td> </td>
            <td><h6 className='m-0'>&#8369; {totalTransactionPrice}</h6></td>
          </tr>
          <tr>
            <td className='ps-2 p-0 m-0'>
              <p className='m-0'>CASH</p>
            </td>
            <td> </td>
            <td>
              <p className='m-0'>&#8369; {cashPayment}</p>
            </td>
          </tr>
          <tr>
            <td className='ps-2 p-0'><p className='m-0'>CHANGE</p></td>
            <td> </td>
            <td><p className='m-0'>&#8369; {paymentChange}</p></td>
          </tr>
          </tbody>
        </table>
        <footer className={styles.footerTransactionDetail}>
            <h3>THANK YOU!</h3>
        </footer>

      </section>     
      <button onClick={handlePrint} className={styles.printBtn}>PRINT RECEIPT</button>  
    </main>
    </>
  )
}

export default TransactionDetail
