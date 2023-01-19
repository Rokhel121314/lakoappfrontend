import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import styles from '../css/style.module.css';
import {FaUserAlt} from 'react-icons/fa'
import { BsInboxesFill } from "react-icons/bs"
import { MdPointOfSale } from "react-icons/md"
import { GrTransaction } from "react-icons/gr"
import { FcSalesPerformance } from "react-icons/fc"
import Axios from 'axios';
import UserLoginLogout from './UserLoginLogout';



export function NavigationBar() {

  // const [userStatus, setUserStatus] = useState('LOG IN');
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
    {/* custom navigation */}
    <nav>
      <div className={styles.navBrand}>
        <Link to="/" className={styles.navBrand}>LAKO</Link>
      </div>
      <div className={styles.navList}>
        <Link to="/home" className={styles.navItem}>HOME</Link>
        <Link to="/" className={styles.navItem}>STOCKS</Link>
        <Link to="/pos" className={styles.navItem}>POS</Link>
        <Link to="/transaction" className={styles.navItem}>TRANSACTION</Link>
        <Link to="/sales" className={styles.navItem}>SALES</Link>
        <UserLoginLogout loginStatus={loginStatus} isAuth={isAuth} logout={logout}/>
        
        

        <Link to="/" className={styles.navIcon}><BsInboxesFill/></Link>
        <Link to="/pos" className={styles.navIcon}><MdPointOfSale/></Link>
        <Link to="/transaction" className={styles.navIcon}><GrTransaction/></Link>
        <Link to="/sales" className={styles.navIcon}><FcSalesPerformance/></Link>
        <Link to="/user" className={styles.navIcon}><FaUserAlt/></Link>


      </div>
    </nav>
  </>
  )
}

