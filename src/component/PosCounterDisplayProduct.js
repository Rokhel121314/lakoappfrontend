import React, {useState} from 'react';
import styles from '../css/style.module.css';


function PosCounterDisplayProduct({productList, addToCounter, counterItems}) {

    const [selectProduct, setSelectProduct] = useState('');
    console.log("selectProduct", selectProduct);

    const theProduct = productList.filter(product => product.productName === selectProduct);

    const resetSelectProduct = () => {
        setSelectProduct('')
    }
    console.log("prod", theProduct);

    console.log('counterItems', counterItems);

  return (
    <>
    <h3 className='ms-2 d-none d-lg-block'>COUNTER</h3>
    <form className="d-flex justify-content-between align-items-center w-100">
    <input
        type="text"
        list="data"
        onSelect={(event)=> setSelectProduct(event.target.value)}
        className={styles.dataListCounter}
        placeholder="SEARCH PRODUCT HERE..."
        // onSelect={selectProduct}
    />

    <datalist id='data'>
        {productList.map(product=> 
            <option key={product.id} value={product.productName}/>)}
    </datalist>

    {theProduct.map(product =>
        <button key={product.id} onClick={()=> {addToCounter(product); resetSelectProduct()}} className={styles.dataListAddBtn}>ADD</button>
     )}
    </form>


    
 
    </>
  )
}

export default PosCounterDisplayProduct
