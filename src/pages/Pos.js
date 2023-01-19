import React, { useEffect, useState } from 'react'
import PosDisplayProduct from '../component/PosDisplayProduct'
import Axios from 'axios';




export function Pos(props) {

  const {addtoCounter} = props;

  const [allProduct, setAllProduct] = useState([])

  useEffect(()=> {
    Axios.get("http://localhost:3001/pos/display",).then((response)=>{
      setAllProduct(response.data)
    })
  }, [])

  return (
    
    <>
      {/* <PosCounter/> */}
      <PosDisplayProduct allProduct={allProduct} addtoCounter={addtoCounter}/>
    </>

    
        
      
      
    
  )
}


