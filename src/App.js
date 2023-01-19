
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, BrowserRouter, Link, Router, Navigate, Outlet} from 'react-router-dom';
import Stocks from "./pages/Stocks";
import { Pos } from "./pages/Pos";
import { Transaction } from "./pages/Transaction";
import { Sales } from "./pages/Sales";
import {NavigationBar} from './component/NavigationBar';
import { ProductDetail } from './pages/ProductDetail';
import TransactionDetail from './pages/TransactionDetail';
import User from './pages/User';
import Home from './pages/Home';
import UserSignUp from './component/UserSignUp';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import ProtectedRoutes from './component/ProtectedRoutes';
import NavBars from './component/NavBars';





function App() {

  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    Axios.get('http://localhost:3001/login').then((response)=>{
      if(response.data.loggedIn == true){
        setIsAuth(true)
      }

    })
  }, []);

  console.log("isAuth", isAuth);
  
  return (
    <>
    {/* <NavigationBar/> */}
    <NavBars/>
    <Routes>
      {/* <Route element={<ProtectedRoutes isAuth={isAuth}/>}> */}
        <Route path='/stocks' element={<Stocks/>} exact/>
        <Route path='/pos' element={<Pos/>} exact/>
        <Route path='/transaction' element={<Transaction/> } exact/>
        <Route path='/sales' element={<Sales/>} exact/>
        <Route path='/stocks/show/:id' element={<ProductDetail/>} exact/>
        <Route path='/transaction/show/:id' element={<TransactionDetail/>} exact/>
      {/* </Route> */}

      <Route path='/user' element={<User/>}/>
      <Route path='/' element={<Home/>}/>
      <Route path='/register' element={<UserSignUp/>}/>
    </Routes>
    {/* <ProtectedRoutes/> */}
    </>

  )
  
}

export default App;
