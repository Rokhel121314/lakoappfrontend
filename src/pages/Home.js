import React from 'react'
import Banner from '../images/banner.png';
import Menu from '../images/menu.png';
import Stocks from '../images/stocks.png';
import Sales from '../images/sales.png';
import Cos from '../images/cos.png';
import Test1 from '../images/t.png';
import Test2 from '../images/t1.png';
import Test3 from '../images/t2.png';
import Logo from '../images/logo.gif';
import styles from '../css/style.module.css';
import '../css/bodyStyle.css';
import Footer from '../component/Footer';
import Ffstocks from '../images/ffstocks.png'
import Ffstockshow from '../images/ffstockshow.png'
import Ffpos from '../images/ffpos.png'
import Ffsales from '../images/ffsales.png'
import Fftranasctions from '../images/fftransactions.png'
import { Link } from 'react-router-dom';



function Home() {
  return (
    <>
     <section className={styles.homeSection}>

          <div className='d-flex flex-column flex-md-row'>
            <div className='d-flex flex-column justify-content-center me-5'>
              <div className='d-flex flex-column justify-content-center ms-4'>
                  <h2 className={styles.tagLine}>We Make</h2>
                  <h2 className={styles.tagLine}>Business</h2>
                  <h1 className={styles.tagLine}>FUN & EASY</h1>
              </div>
              <div className='d-flex justify-content-center ms-md-5 mt-md-3'>
                  <Link to="/user" className='btn btn-success signUpBtn'>SIGN UP NOW!</Link>
                {/* <a href='/signUp' className='btn btn-success signUpBtn'>SIGNUP NOW!</a> */}
              </div>
            </div>
            <div className='homeImg d-flex justify-content-center'>
              <img className='img-thumbnail d-flex mt-5' src={Banner} alt='banner' />
            </div>
          </div>
        
      </section>

      <section className={styles.featureSection} id='features'>
        <p className={styles.titleHeader}>FEATURES</p>
        <div className={styles.featureImages}>
            
            <div className='d-flex flex-column flex-lg-row align-items-center justify-content-center'> 
              <img src={Ffstocks} alt='stocks' />
              <img src={Ffstockshow} alt='stockshow' />
            </div>
            <div className='d-flex flex-column flex-lg-row align-items-center justify-content-center'>
              <img src={Ffpos} alt='pos' />
              <img src={Fftranasctions} alt='transactions' />
            </div>
            <img src={Ffsales} alt='sales' />
        </div>
      </section>

      <section className='mt-5'>
        <content className='d-flex flex-column justify-content-center align-items-center'>
          <h1 className='contentH1'>TESTIMONIALS</h1>
          <div className='d-flex flex-column flex-lg-row mt-5'>
            <img className='my-3 mb-sm-0 mx-5' src={Test1} alt='Testimonial' />
            <img className='my-3 mb-sm-0 mx-5' src={Test2} alt='Testimonial' />
            <img className='my-3 mb-sm-0 mx-5' src={Test3} alt='Testimonial' />
          </div>
        </content>
      </section>

      <section className='mt-5'>
        <content className='d-flex bgSection flex-column justify-content-center align-items-center'>
          <div className='d-flex flex-column flex-sm-row'>
            <div className='gifInfo me-md-5'>
              <img src={Logo} alt='img'></img>
            </div>
            <div className='mx-sm-4 mt-4 mx-md-5'>
              <h3>DEVELOPERS</h3>
              <div className='d-flex flex-column'>
                <a className='devsFb' href='https://web.facebook.com/Rokhel121314/'>Jerick Dela Cruz</a>
                <a className='devsFb' href='https://web.facebook.com/denny.white.5494'>Eduardo Camay III</a>
                <a className='devsFb' href='https://www.facebook.com/hgharold.lopez'>Harold Lopez</a>
              </div>
            </div>

            <div className='mt-4 me-4 me-sm-0 mx-md-5'>
              <h3>SUPPORT</h3>
              <div className='d-flex flex-column'>
                <span><i class="fa-brands fa-facebook"></i> Facebook</span>
                <a className='devsFb' href='mailto:kodegow23g7@gmail.com'><i class="fa-solid fa-envelope"></i> Gmail</a>
                <span><i class="fa-brands fa-facebook-messenger"></i> Messenger</span>
              </div>
            </div>
          </div>
        </content>
      </section>
      <Footer/>
      
    </>
  )
}

export default Home
