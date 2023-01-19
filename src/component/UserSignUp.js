import React from 'react'
import Axios  from 'axios';
import { useState } from 'react';
import Logo from '../images/logo.gif';
import styles from '../css/style.module.css';
import { useNavigate } from 'react-router-dom';


function UserSignUp() {
    const [usernameReg, setUsernameReg] = useState('');
    const [passwordReg, setPasswordReg] = useState('');

    const navigate = useNavigate();

    console.log("usernameReg", usernameReg);
    console.log("passwordReg", passwordReg);

    // Axios.default.withCredentials = true;   (paki alis nalang po sa comment if naka connect napo nawawala display pag naka enable)

    const register = () => {
        Axios.post('http://localhost:3001/register', {
            username: usernameReg,
            password: passwordReg,
        }).then((response)=> {
          console.log(response)
        })
    }

    const navigateToLoginPage = () => {
        alert("YOUR ACCOUNT HAS BEEN REGISTERED YOU MAY LOG IN NOW!")
        navigate('/user');
    };

  return (
    <>
     <main className={styles.mainLogin}>
            {/* <header className={styles.headerLogin}>
                <h4 className='m-0'>LOG IN PAGE</h4>
            </header> */}
            <section className={styles.sectionLogin}>
              <div className='h6 mt-5 pt-5'>WELCOME!!</div>
              <div className='h4 mt-0 '>REGISTER HERE</div>
            <form>
              <div className='w-100 mt-2'>
                <label htmlFor='username' className='form-label m-0'>USER NAME</label>
                <input type='text' className={styles.loginInput} id='username' aria-describedby='usernameHelp' onChange={(e) => {setUsernameReg(e.target.value)}}/>
              </div>
              <div className='mt-3 mb-4'>
              <label className="form-label m-0">PASSWORD</label>
                    <input type="password"
                    className={styles.loginInput}
                      id="exampleInputPassword1"
                      onChange={(e)=>{setPasswordReg(e.target.value)}}
                      />
              </div>
              <div className='d-flex justify-content-center align-items-center'>
              <button onClick={() => {register(); navigateToLoginPage();}} className={styles.loginBtn}>REGISTER</button>
              </div>
            </form>
            
               
            </section>                        
        </main>
    </>
  )
}

export default UserSignUp
