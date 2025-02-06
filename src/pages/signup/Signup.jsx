import React, { useState } from 'react'
import { Form } from 'react-bootstrap';
import { Link } from "react-router-dom";
import './Signup.css'
import { apiService } from '../../service/Service';
import DSButton from '../../components/ds-button/DSButton';
import SnackBar from '../../components/snackbar/SnackBar';


const url = process.env.REACT_APP_API_BASE_URL;

const Signup = () => {


  const [Error, setError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resData, setData] = useState('');
   const [isSnackBar, setIsSnackBar] = useState({
      open: false,
      vertical: 'top',
      horizontal: 'center',
    })
    const [snackBarMsg, setSnackBarMsg] = useState('')
  const [signupData, setSignupData] = useState({
    firstname: '',
    lastname: '',
    gender: '',
    dob: '',
    email: '',
    mobileno: '',
    password: '',

  });

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setSignupData({
      ...signupData,
      [name]: type === "radio" ? (checked ? value : "") : value
    });

  };

 
  const signupUrl = (`${url}/user/signup`);
  const handleSubmit = async (e) => {

    e.preventDefault();
    const PasswordValidation = validation(signupData.password,confirmPassword);
     if(PasswordValidation){
    apiService.post(signupUrl, signupData)
      .then((response) => {
        setData(response);
        const status = resData.status;
        if (status === 200 || status === 201) {
          window.location.href = '/';
        }

      })
      .catch((error) => {
        const errorMessage = error.response?.data?.message || error.message;
        setError(errorMessage);
           })
    }else{
      setSnackBarMsg("Password Mismatch!")
      setIsSnackBar({ open: true });
      setTimeout(() => {
        setIsSnackBar({ open: false });
      }, 3000);
      }
  };

  const validation = (password,confirmPassword) =>{
    if(password !== confirmPassword || password === '' || confirmPassword === ''){
      return false;
    }else{
      return true;
    }
  }
  return (
   <div className='bgc'>
           {
        isSnackBar.open &&
        <SnackBar
          message={snackBarMsg}
          variant="error"
        />
      }
    <div className='maindiv'>
      <div className='inner-signup'>
        <Form className='fm-signup' onSubmit={handleSubmit}>
          <Form.Group className='formGroup'>
            <h3 className='h3elmnt'> Signup</h3>
                 <div className='form-wrapper'>
              <Form.Control
                className='form-control'
                type='text'
                placeholder='Enter the First Name'
                value={signupData.firstname}
                onChange={handleChange}
                name="firstname"
                autoComplete='firstname' />

            </div>
            <div className='form-wrapper'>
              <Form.Control className='form-control'
                type='text'
                placeholder='Enter the Last Name'
                value={signupData.lastname}
                onChange={handleChange}
                name="lastname"
                autoComplete='lastname' />

            </div>

            <div className="mb-3 chk-gender"  >
              <Form.Label className='chk-label'>Gender</Form.Label>
              <Form.Check className='signup-form-check .form-check-input'
                type="radio"
                label="Male"
                name="gender"
                value="male"
                checked={signupData.gender === 'male'}
                onChange={handleChange}
              />
              <Form.Check className='signup-form-check .form-check-input'
                type="radio"
                label="Female"
                name="gender"
                value="female"
                checked={signupData.gender === 'female'}
                onChange={handleChange}
              />
              <Form.Check className='signup-form-check .form-check-input'
                type="radio"
                label="Other"
                name="gender"
                value="other"
                checked={signupData.gender === 'other'}
                onChange={handleChange}
              />

            </div>
            <div className='form-wrapper'>
              <Form.Control
                className='form-control'
                type='date'
                placeholder='Select your Date of birth'
                value={signupData.dob}
                name="dob"
                onChange={handleChange}
                autoComplete='bday' />

            </div>

            <div className='form-wrapper'>
              <Form.Control className='form-control'
                type='number'
                placeholder='Enter the Mobile number'
                value={signupData.mobile}
                onChange={handleChange}
                name="mobileno"
                autoComplete='mobileno' />
              <i className="bi bi-phone"></i>
            </div>

            <div className='form-wrapper'>
              <Form.Control className='form-control'
                type='email'
                placeholder='Enter the Email'
                value={signupData.email}
                onChange={handleChange}
                name="email"
                autoComplete='email' />
              <i className="bi bi-person"></i>
            </div>
            <div className='form-wrapper'>
              <Form.Control className='form-control'
                type='password'
                placeholder='Enter the Password'
                value={signupData.password}
                name="password"
                onChange={handleChange}
                autoComplete='password' />
              <i className="bi bi-eye-slash"></i>
            </div>
            <div className='form-wrapper'>
              <Form.Control className='form-control'
                type='text'
                placeholder='Re-Enter the Password'
                value={confirmPassword}
                name='password'
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete='password' />
              <i className="bi bi-eye"></i>
            </div>
          
            {/* <div className='form-wrapper'>
            <Form.Control className='form-control'
              type='password'
              placeholder='Enter the Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete='current-password' />
            <i className="bi bi-eye-slash"></i>
          </div> */}

            <div>
              <DSButton type='submit' text="Signup" className='fw-bold' onClick={handleSubmit}  ></DSButton>
            </div>
            <div className=" create-acct-signup ">
              <span>Have already an account?</span>
              <Link className='create-link-signup' to="/">Login</Link>
            </div>
          </Form.Group>
        </Form>
      </div>
   
    </div>
    </div>
  )
}

export default Signup