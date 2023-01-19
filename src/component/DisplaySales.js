import React, { useEffect, useState } from 'react'
import {Table} from 'react-bootstrap';
import styles from '../css/style.module.css';
import ReactPaginate from 'react-paginate';

function DisplaySales(props) {

  const {data, salesData, productData} = props;
  // console.log("data", data);

    const [total, setTotal] = useState(0);
    // console.log("total", total);

    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 10;

    useEffect(() => {
      const endOffset = itemOffset + itemsPerPage;
      setCurrentItems(data.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(data.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, data]);
  
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % data.length;
      setItemOffset(newOffset);
    };
    



    const productSold = (salesData.map(product=> JSON.parse(product.soldProducts)));
    // console.log("productSold", productSold);

    // GETTING TOTAL NUMBER OF SOLD ITEMS IN SALES

    const arrayOfSum = productData.map(prod => {
      
      const qty = productSold.map(product => {
        return (parseInt(product.filter(p=> p.id === prod.id).map(q => q.sellQty)));
      });
  
      const newQty = qty.filter(p => {
        return !Number.isNaN(p)
      });
  
      const sum = newQty.reduce((a, b) => a + b, 0);
      // console.log("sum", sum);

      return (
        newQty.reduce((a, b) => a + b, 0)
      )

    });

    const totalQty = arrayOfSum.reduce((a, b) => a + b, 0);
    console.log("totalQty", totalQty);

    // GETTING TOTAL GROSS AMOUNT FROM ORIGINAL PRICE

    const arrayOfSumxOPrice = productData.map(prod => {
      

      const qty = productSold.map(product => {
        return (parseInt(product.filter(p=> p.id === prod.id).map(q => q.sellQty)));
      });
  
      const newQty = qty.filter(p => {
        return !Number.isNaN(p)
      });
  
  
      const sum = newQty.reduce((a, b) => a + b, 0);

      return (
        sum * prod.originalPrice
      )

    });

    const totalGrossOriginal = arrayOfSumxOPrice.reduce((a, b) => a + b, 0);

    console.log("totalGrossOriginal", totalGrossOriginal);

    // GETTING TOTAL GROSS AMOUNT FROM RESELL PRICE

    const arrayOfSumxRPrice= productData.map(prod => {
      

      const qty = productSold.map(product => {
        return (parseInt(product.filter(p=> p.id === prod.id).map(q => q.sellQty)));
      });
  
      const newQty = qty.filter(p => {
        return !Number.isNaN(p)
      });
  
      const sum = newQty.reduce((a, b) => a + b, 0);

      return (
        sum * prod.resellPrice
      )

    });

    const totalGrossResell = arrayOfSumxRPrice.reduce((a, b) => a + b, 0);
    console.log("totalGrossResell", totalGrossResell);

    console.log("net", totalGrossResell-totalGrossOriginal);



  return (

    <>
    <main className={styles.mainSales}>
      <header className={styles.headerSales}>
        <h4 className='m-0 ps-2'>SALES SUMMARY</h4>
        <div className='d-flex align-item-center me-5'>
          <p className='m-0 p-0 me-5 h5'>TOTAL SOLD ITEM: {totalQty.toFixed(2)} PCS</p>
          <p className='m-0 p-0 me-5 h5'>TOTAL RESELL AMOUNT: &#8369; {totalGrossResell.toFixed(2)}</p>
          <p className='m-0 p-0 me-5 h5'>TOTAL ORIGINAL AMOUNT: &#8369; {totalGrossOriginal.toFixed(2)}</p>
          <p className='m-0 p-0 me-5 h5'>TOTAL NET REVENUE: &#8369; {(totalGrossResell-totalGrossOriginal).toFixed(2)}</p>
        </div>
      </header>
      <section className={styles.sectionSales}>
        <div className='productData'>
        <Table className='w-100' striped>
          <thead>
            <tr>
              <td className='h6'>DESCRIPTION</td>
              <td className='text-center'>
                <h6 className='m-0'>QTY</h6>
                <p className={styles.desc}>(pcs)</p>
              </td>
              <td className='text-center'>
                <h6 className='m-0'>O.PRICE</h6>
                <p className={styles.desc}>(&#8369;)</p>
              </td>
              <td className='text-center'>
                <h6 className='m-0'>R.PRICE</h6>
                <p className={styles.desc}>(&#8369;)</p>
              </td>
              <td className='text-center'>
                <h6 className='m-0'>R.GROSS</h6>
                <p className={styles.desc}>(QTY x R.PRICE)</p>
              </td>
              <td className='text-center'>
                <h6 className='m-0'>O.GROSS</h6>
                <p className={styles.desc}>(QTY x O.PRICE)</p>
              </td>
              <td className='text-center'>
                <h6 className='m-0'>NET</h6>
                <p className={styles.desc}>(R.GROSS - O.GROSS)</p>
              </td>
            </tr>
          </thead>
          <tbody>
            {currentItems?.map(product => {

              const qty = productSold.map(prod => {
                return (parseInt(prod.filter(p=> p.id === product.id).map(q => q.sellQty)));
              });

              const resellPrice = productSold.map(prod => {
                return (parseInt(prod.filter(p=> p.id === product.id).map(q => q.resellPrice)));
              });

              const newQty = qty.filter(p => {
                return !Number.isNaN(p)
              });

              const sum = (newQty.reduce((a, b) => a + b, 0)).toFixed(2);

            return (
              <tr key={product.id}>
                <td>{product.productName}</td>
                <td className='text-center'>{sum}</td>
                <td className='text-center'>&#8369; {product.originalPrice.toFixed(2)}</td>
                <td className='text-center'>&#8369; {product.resellPrice.toFixed(2)}</td>
                <td className='text-center'>&#8369; {(sum*product.resellPrice).toFixed(2)}</td>
                <td className='text-center'>&#8369; {(sum*product.originalPrice).toFixed(2)}</td>
                <td className='text-center'>&#8369; {(sum * (product.resellPrice - product.originalPrice)).toFixed(2)}</td>
              </tr>
            )
            })}

          </tbody>
        </Table>

        </div>
       
      </section>
      <footer className={styles.footerTransactionDisplay}>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        containerClassName='pagination'
        pageLinkClassName='page-num'
        previousLinkClassName='page-num'
        nextLinkClassName='page-num'
        activeLinkClassName='active'
      />
      </footer>

    </main>
      {/* <div className='row'>
        <h1 className='col-3'>PRODUCT NAME</h1>
        <h1 className='col-3'>SOLD QTY</h1>
        <h1 className='col-3'>RESELL PRICE</h1>
        <h1 className='col-3'>TOTAL PRICE</h1>
      </div>
      {productData.map(product => {

        const qty = productSold.map(prod => {
          return (parseInt(prod.filter(p=> p.id === product.id).map(q => q.sellQty)));
        });

        const resellPrice = productSold.map(prod => {
          return (parseInt(prod.filter(p=> p.id === product.id).map(q => q.resellPrice)));
        });

        const newQty = qty.filter(p => {
          return !Number.isNaN(p)
        });

        const sum = newQty.reduce((a, b) => a + b, 0);

        return (
          <div key={product.id} className="row">

            <h1 className='col-3'>{product.productName}</h1>
            <h4 className='col-3'>{sum}</h4>
            <h4 className='col-3'>{product.resellPrice}</h4>
            <h4 className='col-3'>{product.resellPrice * sum}</h4>

          </div>

        )

      })} */}
    </>

  )
}

export default DisplaySales
