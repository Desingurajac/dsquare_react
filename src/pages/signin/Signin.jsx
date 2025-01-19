import React, { useState } from 'react'
import './Signin.css'
import { Form, Image } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { apiService } from '../../service/Service';
import { jwtDecode } from 'jwt-decode';




const url = process.env.REACT_APP_API_BASE_URL;

export const Signin = () => {


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const loginUrl = (`${url}/user/login`);
    const loginData = { email: email, password: password }
    apiService.post(loginUrl, loginData)
      .then((response) => {
        const status = response.status;
        if (status === 200) {
          const token = response.data.Token;
          localStorage.setItem('authToken', token);
          const decodeToken = jwtDecode(token);
          localStorage.setItem('userId', decodeToken.userid);
          window.location.href = '/dashboard';
        }

      })
      .catch((error) => {
        const errorMessage = error.response?.data?.message || error.message || "An unknown error occurred";
        setError(errorMessage);
        console.log("Error   =>", errorMessage);
      })
  };

  const mailHandling = async (e) => {
      const valueEmail = e.target.value;
       setEmail(valueEmail);
    if (emailRegex.test(valueEmail)) {
      setError("")
    }else{
      setError("Invalid email format"); 
    }

  }

  return (

    <div className='container'>

      <div className='left-section'>
        <Form className='form' onSubmit={handleSubmit}>
          <Form.Group>
            <h3 className='h3el'>Login</h3>
            {
              error && <p className="error errorcl">{error}</p>

            }

            <div className='form-wrapper'>
              <Form.Control
                className='form-control'
                type='email'
                placeholder='Enter the Email'
                value={email}
                onChange={mailHandling}
                autoComplete='email' />
              <i className="bi bi-person"></i>
            </div>
            <div className='form-wrapper'>
              <Form.Control className='form-control'
                type='password'
                placeholder='Enter the Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete='current-password' />
              <i className="bi bi-eye-slash"></i>
            </div>

            <div className="mb-3">
              <Form.Check // prettier-ignore
                type='checkbox'
                label='Reminder me'
              />
              <div className="forgot-password frgt-pass-link">
                <Link to="/forgotpassword">Forgot Password?</Link>
              </div>
            </div>
            <div>
              <button type='submit' className='btn-br fw-bold' onClick={handleSubmit} >Login</button>
            </div>
            <div className="forgot-password create-acct">
              <span>Not on Account?</span>
              <Link className='create-link' to="/signup">Create an account</Link>
            </div>
          </Form.Group>
        </Form>
      </div>
      <div className='right-section'>
        <Image src={require('/Raja/React_Dsquare/dkart/src/asserts/images/login.webp')}
          alt='Second Slide'></Image>
      </div>
    </div>

  )
}




