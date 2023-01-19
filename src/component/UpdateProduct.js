import  Axios  from 'axios';
import React, { useState } from 'react';
import { Modal, Form } from 'react-bootstrap';
import styles from '../css/style.module.css';




export function UpdateProduct(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [updatedProductName, setUpdatedProductName] = useState(props.productName);
  const [updatedProductQty, setUpdatedProdcutQty] = useState(props.productQty);
  const [updatedOriginalPrice, setUpdatedOriginalPrice] = useState(props.originalPrice);
  const [updatedResellPrice, setUpdatedResellPrice] = useState(props.resellPrice);
  const [updatedProductCategory, setUpdatedProductCategory] = useState(props.productCategory)
  const productId = (props.id);
  // console.log(productId)
  

  const updateProduct = () => {
    Axios.put("http://localhost:3001/stocks/update",{

  updatedProductName: updatedProductName,
  updatedProductQty: updatedProductQty,
  updatedOriginalPrice: updatedOriginalPrice,
  updatedResellPrice: updatedResellPrice,
  updatedProductCategory: updatedProductCategory,
  productId : productId,
    })
  }

  const reRenderPage = () => {
    window.location.reload();
  }



//  console.log("productName:",props.productName)
//  console.log("productQty:",props.productQty)
//  console.log("originalPrice:",props.originalPrice)
//  console.log("resellPrice:",props.resellPrice)
//  console.log("productCategory:",props.productCategory)
//  console.log("productImage:",props.productImage)

  return (
    <>
      <button className={styles.updateBtn} onClick={handleShow}>
        UPDATE PRODUCT
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        // onExit={reRenderPage}
      >
        <Modal.Header closeButton className={styles.modalHeader}>
          <Modal.Title>UPDATE PRODUCT</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form>
            <Form.Label className='m-0'>Product Name</Form.Label>
            <Form.Control
            type='text'
            defaultValue={props.productName}
            onChange={(event) => setUpdatedProductName(event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1))}
            />

            <Form.Label className='m-0 mt-3'>Product Qty</Form.Label>
            <Form.Control
            type='number'
            defaultValue={props.productQty}
            onChange={(event) => setUpdatedProdcutQty(event.target.value)}
            />

            <Form.Label className='m-0 mt-3'>Original Price</Form.Label>
            <Form.Control
            type='number'
            defaultValue={props.originalPrice}
            onChange={(event) => setUpdatedOriginalPrice(event.target.value)}
            />

            <Form.Label className='m-0 mt-3'>Resell Price</Form.Label>
            <Form.Control
            type='number'
            defaultValue={props.resellPrice}
            onChange={(event) => setUpdatedResellPrice(event.target.value)}
            />
            <Form.Label htmlFor="productCategory" className='mt-1'>Category</Form.Label>
            <Form.Select aria-label="Default select example" name='productCategory' id='productCategory'
            onChange={(event => setUpdatedProductCategory(event.target.value))}>
              <option>{props.productCategory}</option>
              <option value="Food & Beverage">Food & Beverage</option>
              <option value="Household/Cleaning">Household/Cleaning</option>
              <option value="Personal Care">Personal Care</option>
              <option value="Others">Others</option>
            </Form.Select>                 
            </Form>
          
        </Modal.Body>
        <Modal.Footer>
          <button className={styles.cancelBtn} onClick={handleClose}>
            Close
          </button>
          <button className={styles.addBtn} onClick={()=> {handleClose(); updateProduct(); reRenderPage();}}>Save Update</button>
        </Modal.Footer>
      </Modal>
    </>
  );
}


