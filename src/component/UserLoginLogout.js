import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../css/style.module.css';
import {Dropdown, NavDropdown} from 'react-bootstrap';


function UserLoginLogout({loginStatus, isAuth, logout}) {



  if(isAuth == true) {
    return (

        <>
        <NavDropdown  title={loginStatus} className={styles.dropdown}>
            <NavDropdown.Item onClick={logout} ><Link to="/user" className={styles.dropdownitem}>LOG OUT</Link></NavDropdown.Item>
        </NavDropdown>
        </>    
    )
  }
  else {
    return <Link to="/user" className={styles.navItem}>LOG IN</Link>
  }

    // <>
    
    //   <Link to="/user" className={styles.navItem}>{loginStatus}</Link>
    // </>
  
}

export default UserLoginLogout
