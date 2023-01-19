import React, { useEffect, useState } from 'react'
import styles from '../css/style.module.css';
import Logo from '../images/logo.gif';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';




function UserLogIn() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  

  const [loginStatus, setLoginStatus] = useState('');
  const [isAuth, setIsAuth] = useState(true);

  Axios.defaults.withCredentials = true;
  console.log("username", loginStatus);

  console.log("userpass", username, password);
  // console.log("auth", isAuth);

  const login = () => {
    Axios.post('http://localhost:3001/login', {
      username: username,
      password:password,
    }).then((response) => {
      if(response.data.message) {
        setLoginStatus(response.data.message)
      }else {
        setLoginStatus(response.data[0].username)
      }
    }).then(setTimeout(()=> {
      reRenderPage();
      
    }, 500)).then(() => {
      setIsAuth(true)
    })
  };


  useEffect(() => {
    window.localStorage.setItem("isAut", isAuth);
  }, [isAuth]);



const reRenderPage = () => {
  
  window.location.reload()
}


  return (
    <>
        <main className={styles.mainLogin}>
            {/* <header className={styles.headerLogin}>
                <h4 className='m-0'>LOG IN PAGE</h4>
            </header> */}
            <section className={styles.sectionLogin}>
              <div className='h6 mt-5 pt-5'>WELCOME BACK</div>
              <div className='h4 mt-0'>LOG IN TO YOUR ACCOUNT</div>

              <div className=' mt-2'>
                <label htmlFor='username' className='form-label m-0'>USER NAME</label>
                <input type='text' className={styles.loginInput} id='username' aria-describedby='userHelp' onChange={(e) => {setUsername(e.target.value)}}/>
              </div>
              <div className='mt-3'>
              <label className="form-label m-0">PASSWORD</label>
                    <input type="password"
                    className={styles.loginInput}
                      id="exampleInputPassword1"
                      onChange={(e)=>{setPassword(e.target.value)}}
                      />
              </div>
              <div className="form-check d-flex flex-column align-items-center">
                  <span>{loginStatus}</span>
            </div>
                  <button type='submit' onClick={()=> {login()}} className={styles.loginBtn}>Login</button>
                <div className='mt-4'>
                    <span>Don't have an account? SignUp,<Link to='/register'>HERE</Link></span>
                </div>
            
               
            </section>                        
        </main>
      
    </>
  )
}

export default UserLogIn
