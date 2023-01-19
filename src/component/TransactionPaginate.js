import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';
import { Table} from 'react-bootstrap';
import styles from '../css/style.module.css';
import pagination from '../css/pagination.css';
import { Link } from 'react-router-dom';


function TransactionPaginate(props) {

  const {data} = props;

  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 9;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, data]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
  };

  return (
    <>
    <section className={styles.sectionTransactionDisplay}>
      <div className='transactionList'>
      <Table striped className={styles.tableTransactionDisplay}>
      <thead >
        <tr className={styles.tableHeader}>
          <th className='col-2 text-center'>TRANSACTION #</th>
          <th className='col-2 text-center'>ITEMS SOLD</th>
          <th className='col-2 text-center'>TOTAL PRICE</th>
          <th className='col-4 text-center'>DATE SOLD</th>
          <th className='col-2 text-center'>ACTION</th>
          
        </tr>
      </thead>
      <tbody>
      {currentItems?.map(product=> {
            return (
                <tr key={product.transaction_id}>
                <td className='col-2 text-center'>TRANSACTION #{product.transaction_id}</td>
                        <td className='col-2 text-center'>{product.totalSoldQty}.00 PCS</td>
                        <td className='col-2 text-center'>&#8369; {product.totalSoldPrice}.00</td>
                        <td className='col-4 text-center'>{product.transactionDate}</td>
                        <td className='col-2 text-center'>
                          <Link to={"/transaction/show/" + product.transaction_id}>
                          <button className={styles.viewDetailsBtn} size='sm' >VIEW RECEIPT</button>
                          </Link>           
                      </td>
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
    </>
  );
      

}

export default TransactionPaginate
