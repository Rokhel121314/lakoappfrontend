import React from 'react'
import { Modal, Form } from 'react-bootstrap';
import styles from '../css/style.module.css';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';



function DisplayStock() {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [productName, setProductName] = useState('');
  const [productQty, setProductQty] = useState(0);
  const [originalPrice, setOriginalPrice] = useState(0);
  const [resellPrice, setResellPrice] = useState(0);
  const [productCategory, setProductCategory] = useState('');
  const [productImage, setProductImage] = useState('default.png');
  const [productList, setProductList] = useState([]);
  const [newProductList, setNewProductList] = useState([]);
  const [categoryValue, setCategoryValue] = useState(0);
  const [ searchInput, setSearchInput] = useState([]);

  // console.log("tempImg", tempImage);


  useEffect(()=> {
    Axios.get("http://localhost:3001/stocks/show",).then((response)=>{
      setProductList(response.data)
    })
  }, []);

  useEffect(()=> {
    Axios.get("http://localhost:3001/stocks/show",).then((response)=>{
      setNewProductList(response.data)
    })
  }, []);
  

  const saveAddedProduct = () => {
    Axios.post("http://localhost:3001/stocks/add", {
      productName: productName,
      productQty: productQty,
      originalPrice: originalPrice,
      resellPrice: resellPrice,
      productCategory: productCategory,
      productImage: productImage
    }).then(()=> {
      
    })
  };

  console.log("selectValue", categoryValue);
  console.log("newProductList", newProductList);

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
  }, [categoryValue]);

  useEffect(() => {
    if(searchInput.length > 0) {
        setNewProductList(productList.filter(product => ((product.productName.toUpperCase()).match(searchInput))));
    }
    else {
        setNewProductList(productList);
    }
}, [searchInput.length]);

  const reRenderPage = () => {
    window.location.reload();
  }

  return (
    <div>
      <main>

        {/* HEADER */}
        <header className={styles.stockHeader}>
          <div className='ms-3 col-4 col-sm-3'>
            <p className='h5'>PRODUCTS</p>
            <button className={styles.createBtn} onClick={handleShow}>CREATE</button>
          </div>
          <div className='d-flex flex-column me-3 col-9'>
            <form className='d-flex justify-content-between flex-column flex-sm-row'>
                <div className='col-6 text-end'>
                  <input type="search" placeholder='SEARCH PRODUCT HERE...' id='searchPosProduct' className={styles.displaySearch} onChange={(event)=> {event.preventDefault(); setSearchInput(event.target.value.toUpperCase())}}/>
                </div>
                <div className='col-6 text-center'>
                  <select id='filterByCategory'  onChange={(event)=>setCategoryValue(event.target.value)} className={styles.filterByCategory}>
                    <option value="0" >FILTER BY CATEGORY...</option>
                    <option value="1">Food & Beverage</option>
                    <option value="2">HouseHold & Cleaning</option>
                    <option value="3">Personal Care</option>
                    <option value="4">Others</option>
                </select>
                </div>
            </form>
          </div>
        </header>
        {/* END OF HEADER */}

        {/* SECTION */}
        <section className={styles.stockSection}>
          {newProductList.map(product => {
            return (
              

              // PRODUCT DISPLAY BOX
              <Link key={product.id} to={"/stocks/show/" + product.id} className={styles.perProductLink}>
                <div className={styles.stockImage}>
                    <img src={require('../img/' + product.productImage)} alt='PRODUCT IMAGE' className={styles.productImage}/>
                </div>


                <div className={styles.productDetails}>
                    <p>{product.productName}</p>
                    <p>
                      QTY: {(product.productQty).toFixed(2)}
                    </p>
                    <p>PRICE: &#8369; {(product.resellPrice).toFixed(2)}</p>
                </div>
                
              </Link>
            )
          })}


        </section>

        {/* END OF SECTION */}
      </main>


      <Modal
              show={show}
              onHide={handleClose}
              // onExit={reRenderPage}
              backdrop="static"
              keyboard={false}>


                  <Modal.Header closeButton className={styles.modalHeader}>
                    <Modal.Title>ADD NEW PRODUCT</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>

                      {/* input type for product_name */}
                      <Form.Label htmlFor="productName" className='m-0'>Product Name</Form.Label>
                      <Form.Control
                        type="text"
                        id="productName"
                        name='productName'
                        onChange={(event)=>{setProductName(event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1))}}
                        required
                      />
                      {/* input type for product_qty */}
                      <Form.Label htmlFor="productQty" className='m-0 mt-1' >Product Quantity</Form.Label>
                      <Form.Control
                        type="number"
                        id="productQty"
                        name='productQty'
                        onChange={(event)=>{setProductQty(event.target.value)}}
                        required
                      />
                      {/* input type for original_price */}
                      <Form.Label htmlFor="originalPrice" className='m-0 mt-1' >Original Price</Form.Label>
                      <Form.Control
                        type="number"
                        id="orginalPrice"
                        name='originalPrice'
                        onChange={(event)=>{setOriginalPrice(event.target.value)}}
                        required
                      />
                      {/* input type for resell_price */}
                      <Form.Label htmlFor="resellPrice" className='m-0 mt-1' >Resell Price</Form.Label>
                      <Form.Control
                        type="number"
                        id="resellPrice"
                        name='resellPrice'
                        onChange={(event)=>{setResellPrice(event.target.value)}}
                        required
                      />
                      {/* input for category */}
                      <Form.Label htmlFor="productCategory" className='m-0 mt-1'>Category</Form.Label>
                      <Form.Select aria-label="Default select example" name='productCategory' id='productCategory' onChange={(event)=>{setProductCategory(event.target.value)}}>
                        <option>Open this select menu</option>
                        <option value="Food & Beverage">Food & Beverage</option>
                        <option value="Household/Cleaning">Household/Cleaning</option>
                        <option value="Personal Care">Personal Care</option>
                        <option value="Others">Others</option>
                      </Form.Select>

                      {/* input type for resell_price */}
                      {/* <Form.Label htmlFor="productImage" className='m-0 mt-1' >Product Image</Form.Label>
                      <Form.Control
                        type="text"
                        id="productImage"
                        name='productImage'
                        onChange={(event)=>{setProductImage(event.target.value)}}
                      /> */}
                      {/* input type for resell_price */}
                      <Form.Label htmlFor="productImage" className='m-0 mt-1' >Product Image</Form.Label>
                      <Form.Control
                        type="file"
                        id="productImage"
                        name='productImage'
                        onChange={(event)=>{setProductImage(event.target.files[0].name)}}
                      />
                    </Form>
                    
                  </Modal.Body>
                  <Modal.Footer>
                    <button  onClick={handleClose} className={styles.cancelBtn}>
                      CANCEL
                    </button>
                    <button type='submit' onClick={() => {saveAddedProduct(); handleClose(); reRenderPage();}} className={styles.addBtn}>ADD PRODUCT</button>
                  </Modal.Footer>
                </Modal>

      {/* reserve */}


    </div>
  )
}

export default DisplayStock
