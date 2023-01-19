import React, { useState } from 'react'
import { Modal } from 'react-bootstrap';
import styles from '../css/style.module.css';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';



export function DeleteProduct(props) {

    const productId = props.id;
    const productName = props.productName;
    console.log("productId", productId);

    const navigate = useNavigate();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

        const deleteProduct = () => {
            Axios.delete(`http://localhost:3001/stocks/delete/${productId}`)
        }

        const navigateTo = () => {
            navigate('/stocks');
        };

        const reRenderPage = () => {
          window.location.reload();
        }




    return (

        <>
        <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton className={styles.modalHeader}>
          <Modal.Title>DELETE PRODUCT</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Are you sure you want to Delete {productName} on your stocks?</h5>
        </Modal.Body>
        <Modal.Footer>
          <button className={styles.cancelBtn} onClick={handleClose}>
            NO!
          </button>
          <button className={styles.addBtn} onClick={() =>{deleteProduct(); navigateTo(); reRenderPage()}}>YES!</button>
        </Modal.Footer>
      </Modal>
        {/* <Button variant="danger" onClick={() =>{deleteProduct(); navigateTo();}}>DELETE PRODUCT</Button> */}
        <button className={styles.deleteBtn} onClick={handleShow}>DELETE PRODUCT</button>
        </>
    )

}


