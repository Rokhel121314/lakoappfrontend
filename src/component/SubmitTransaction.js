import React from 'react'
import styles from '../css/style.module.css';
import Axios from 'axios';

function SubmitTransaction({counterItems,allTotalPrice, allSoldQty, allProduct, cashPayment, paymentChange, handleChange, disabledBtn, hoverEff, bgColor}) {
 
    console.log("counterItems",counterItems);
    console.log("alltotalPrice", allTotalPrice);
    console.log("allSoldQty", allSoldQty);
    console.log("cashPayment", cashPayment);
    console.log("paymentChange", paymentChange);
    // console.log("allProducts", allProduct);

    // const [productId, setProductId] = useState([]);
    // const [ productQty, setProductQty] = useState('');


    const reRenderPage = () => {
      window.location.reload();
    }

    const addTransaction = () => {
      Axios.post("http://localhost:3001/transaction/insert", {
        counterItems: JSON.stringify(counterItems),
        allSoldQty: allSoldQty,
        allTotalPrice: allTotalPrice,
        cashPayment: cashPayment,
        paymentChange: paymentChange,
        transactionDate: formatAMPM(new Date()),

      }).then(() => {

      })
      
    };

    function formatAMPM(date) {
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0'+minutes : minutes;
      
      var today = new Date(),
      thedate = (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear();
      var strTime = thedate + ' / ' + hours + ':' + minutes + ' ' + ampm;
      return strTime;
    }
    
    console.log(formatAMPM(new Date()));

   

    const updateStocksPerTransaction = async () =>{
      Axios.put("http://localhost:3001/pos/update-stocks", {
      productId : productId,
      productQty: productQty
    } )

    } ;

    const productId = counterItems?.map(product => product.id);
    console.log("counterIds", productId);

    const productQty = counterItems?.map(p => {
      return p.productQty - p.sellQty
    })
    console.log("productQty", productQty);









 
    return (
    

    <>
      <button type='submit' className={styles.posSubmitBtn} onClick={() => {addTransaction(); reRenderPage(); updateStocksPerTransaction()}} disabled={disabledBtn} style={{pointerEvents: hoverEff, backgroundColor: bgColor}}>SUBMIT</button>
    </>
  )
}

export default SubmitTransaction
