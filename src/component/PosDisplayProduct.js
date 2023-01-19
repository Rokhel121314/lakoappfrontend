import Axios from 'axios';
import React, { useState, useEffect } from 'react'
import styles from '../css/style.module.css';
import PosCounter from './PosCounter';
import PosCounterDisplayProduct from './PosCounterDisplayProduct';





function PosDisplayProduct(props) {

    const [newProductList, setNewProductList] = useState([]);
    const [categoryValue, setCategoryValue] = useState(0);
    const [ searchInput, setSearchInput] = useState([]);

    useEffect(()=> {
        Axios.get("http://localhost:3001/stocks/show",).then((response)=>{
          setNewProductList(response.data)
        })
      }, []);

    console.log("newProductLis", newProductList)

    
    const productList = props.allProduct
    // console.log("allProduct", allProduct)

    const [counterItems, setCounterItems] = useState([]);

    const addToCounter = (product) => {

        const exist = counterItems.find((p) => p.id === product.id);
        if (exist) {
            setCounterItems(
                counterItems.map((p) => 
                    p.id === product.id ? {...exist, sellQty: exist.sellQty + 1} : p
                )
            );
        }
        else {
            setCounterItems([...counterItems, {...product, sellQty: 1}])
        }

    };

    const lessToCounter = (product) => {
        const exist = counterItems.find((p) => p.id === product.id);
        if(exist.sellQty === 1) {
            setCounterItems(counterItems.filter(p => p.id !== product.id))}
        else {
            setCounterItems(
                counterItems.map((p) => 
                    p.id === product.id ? {...exist, sellQty: exist.sellQty - 1} : p
                )
            )
        }
        
    }

    // search product

    useEffect(() => {
        if(searchInput.length > 0) {
            setNewProductList(productList.filter(product => ((product.productName.toUpperCase()).match(searchInput))));
        }
        else {
            setNewProductList(productList);
        }
    }, [searchInput.length]);


    // for filtering by category
    useEffect(()=> {
        if( categoryValue == 0) {
          setNewProductList(productList);
        }
        if(categoryValue == 1) {
          setNewProductList( productList.filter(product=> product.productCategory === "Food & Beverage"));
        }
        if(categoryValue == 2) {
          setNewProductList( productList.filter(product => product.productCategory === "Household/Cleaning"));
        }
        if( categoryValue == 3) {
          setNewProductList(productList.filter(product => product.productCategory === "Personal Care"));
        }
        if ( categoryValue == 4) {
          setNewProductList( productList.filter(product=> product.productCategory === "Others"))
        };
    }, [categoryValue])
  
  return (
    
    <>
    <main className={styles.posMain}>
        <section className={styles.counterSection}>
            <header className={styles.counterHeader}>
                <PosCounterDisplayProduct productList={productList} addToCounter={addToCounter} counterItems={counterItems}/>
            </header>
            <article className={styles.counterArticle}>
                <PosCounter counterItems={counterItems} addToCounter={addToCounter} allProduct={productList} lessToCounter={lessToCounter}/>
            </article>
        </section>

        <section className={styles.displaySection}>
            <header className={styles.displayHeader}>
                <form className='d-flex justify-content-between align-items-center'>

                    <div className={styles.searchContainer}>
                        <input type="search" placeholder='SEARCH PRODUCT HERE...' id='searchPosProduct' className={styles.posSearch} onChange={(event)=> {event.preventDefault(); setSearchInput(event.target.value.toUpperCase())}}/>
                    </div>

                    <div className='me-5 mt-2'>
                        <select id='sortPosProduct'  onChange={(event)=>setCategoryValue(event.target.value)} className={styles.posFilter}>
                            <option value="0" >FILTER BY CATEGORY...</option>
                            <option value="1">Food & Beverage</option>
                            <option value="2">HouseHold & Cleaning</option>
                            <option value="3">Personal Care</option>
                            <option value="4">Others</option>
                        </select>
                    </div>
                </form>
            </header>
            <article className={styles.displayProductArticle}>
                <div className='d-flex flex-wrap w-100 justify-content-start align-items-start'>
                {newProductList.map(product => {
                    return (
                    <button className={styles.productBtn} key={product.id} onClick={() =>addToCounter(product)}>
                        <h5 className={styles.productQty}>{product.productQty}</h5>
                        <h5 className={styles.resellPrice}> &#8369;{product.resellPrice}.00</h5>
                        <img src={require('../img/' + product.productImage)} alt='img' height={100} widht={100}/>   
                    </button>
                    )
                })}
                </div>
            </article>
        </section>
    </main>

    </>
  )
}

export default PosDisplayProduct
 