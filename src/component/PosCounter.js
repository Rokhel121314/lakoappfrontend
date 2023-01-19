import React, { useState } from 'react'
import styles from '../css/style.module.css';
import SubmitTransaction from './SubmitTransaction';
import { AiOutlinePlusSquare } from "react-icons/ai"
import { AiOutlineMinusSquare } from "react-icons/ai"

function PosCounter(props) {


  // const allProduct = props.allProduct
  const {counterItems, allProduct, addToCounter, lessToCounter} = props;
  // const [totalPrice, setTotalPrice] = useState(0);
  const [buyersMoney, setBuyersMoney] = useState(0);
  const [disabledBtn, setDisabledBtn] = useState(true);
  const [hoverEff, setHoverEff] = useState('none');
 

  const eachtTotalPrice = counterItems.map(product =>{
    return (
      product.resellPrice * product.sellQty
    )
  });

  const eachSoldQty = counterItems.map(product=>{
    return product.sellQty
  });


  const allTotalPrice = (eachtTotalPrice.reduce((total, price )=>
    total+price,0
  ).toFixed(2));

  const allSoldQty = (eachSoldQty.reduce((total, qty) =>
    total+qty,0
  )).toFixed(2);
  // console.log("eachTotalPrice",eachtTotalPrice, "allTotalPrice", allTotalPrice, "allSoldQty", allSoldQty)
  // console.log("totalPrice", totalPrice);

  console.log("counterItems",counterItems)

  const buyersChange = (buyersMoney - allTotalPrice).toFixed(2);

  function handleChange(event) {
    setBuyersMoney(event.target.value);
    if(event.target.value > allTotalPrice - 1) {
      setDisabledBtn(false)
      setHoverEff('')
    }
    else{
      setDisabledBtn(true)
      setHoverEff('none')
    }
  }

  


  return (
    <>
      <div className={styles.counterContainer}>
        <table className={styles.posTableContainer}>
          <thead className={styles.posTableHeader}>
            <tr>
              <td className='ps-2 col-5'>PRODUCT NAME</td>
              <td className='text-center col-4'>QTY</td>
              <td className='text-center col-3'>PRICE</td>
            </tr>
          </thead>
          <tbody>
            {counterItems.map(product => {

                const totalPric = product.resellPrice * product.sellQty;
              return (
                <tr key={product.id}>
                <td className='ps-2 col-5'>{product.productName}</td>
                <td className='text-center col-4 fs-5'>
                  <span className={styles.counterBtn} onClick={ ()=> lessToCounter(product)}>
                  <AiOutlineMinusSquare className={styles.icon1}/>
                  </span>

                  {(product.sellQty).toFixed(2)}
                  <span className={styles.counterBtn}  onClick={ ()=> addToCounter(product)}>
                  <AiOutlinePlusSquare className={styles.icon2}/>
                  </span>


                </td>
                <td className='text-center col-3 fs-5'>&#8369; {(totalPric).toFixed(2)}</td>
              </tr>
              )  
            })}

          </tbody>
        </table>
      </div>
      <div className={styles.posCounterSummary}>
          <div className='row'>
            <h5 className='col-4 ps-5'>TOTAL</h5>
            <h5 className='col-4'>{allSoldQty} pcs</h5>
            <h5 className='col-4'>&#8369; {allTotalPrice}</h5>
          </div>
          <div className='row'>
            <h5 className='col-4 ps-5'>CHANGE</h5>
            <div className='col-4'>
              <form>
              <input type="number" className="w-75" placeholder='CASH' onChange={handleChange} required/>
              </form>
            </div>
            <h5 className='col-4'>&#8369; {buyersChange}</h5>
          </div>
          <SubmitTransaction counterItems={counterItems} allTotalPrice={allTotalPrice} allSoldQty={allSoldQty} allProduct={allProduct} cashPayment={buyersMoney} paymentChange={buyersChange} handleChange={handleChange} disabledBtn={disabledBtn} hoverEff={hoverEff}/>
      </div>


     
      
    </>
  )
}

export default PosCounter
