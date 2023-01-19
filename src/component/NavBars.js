import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Navbar, Container, Nav, NavDropdown, Offcanvas, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from '../css/style.module.css';
import UserLoginLogout from './UserLoginLogout';



function NavBars() {

    const [loginStatus, setLoginStatus] = useState('LOG IN');
    const [isAuth, setIsAuth] = useState(false);
  
    useEffect(() => {
      Axios.get('http://localhost:3001/login').then((response)=>{
        if(response.data.loggedIn == true){
          setLoginStatus(response.data.user[0].username);
          setIsAuth(true)
        }
  
      })
    }, []);
  
    const reRenderPage = () => {
      window.location.reload()
    }
  
    const logout = () => {
      Axios.post('http://localhost:3001/logout', {
  
      }).then(setTimeout(()=> {
        reRenderPage();
        
      }, 500))
    }
  return (
    <>
      {['xxl'].map((expand) => (
        <Navbar key={expand}  expand={expand} className="mb-0">
          <Container fluid className={styles.naviposition}>
            <Navbar.Brand>
                <Link to="/" className={styles.navBrand}>LAKO</Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
              className={styles.navOffCanvas}
            >
              <Offcanvas.Header closeButton className={styles.canvasBody}>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`} className="text-light">
                  LAKO MENU
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body className={styles.canvasBody}>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                <Link to="/" className={styles.navItem}>HOME</Link>
                <Link to="/stocks" className={styles.navItem}>STOCKS</Link>
                <Link to="/pos" className={styles.navItem}>POS</Link>
                <Link to="/transaction" className={styles.navItem}>TRANSACTION</Link>
                <Link to="/sales" className={styles.navItem}>SALES</Link>
                <UserLoginLogout loginStatus={loginStatus} isAuth={isAuth} logout={logout}/>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
        ))}

    </>
  )
}

export default NavBars
