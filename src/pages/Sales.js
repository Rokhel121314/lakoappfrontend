
import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import DisplaySales from '../component/DisplaySales'





export function Sales(props) {

  const [salesData, setSalesData] = useState([]);
  const [productData, setProductData] = useState([]);

  useEffect(()=> {
    Axios.get("http://localhost:3001/sales/show",).then((response)=>{
      setSalesData(response.data)
    })
  }, []);

  useEffect(()=> {
    Axios.get("http://localhost:3001/sales/show/stock",).then((response)=>{
      setProductData(response.data)
    })
  }, []);



  return (
    <div>
        <DisplaySales salesData={salesData} productData={productData} data={productData}/>
    </div>
  )
}


