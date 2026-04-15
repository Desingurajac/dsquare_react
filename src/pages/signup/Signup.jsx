import React, { useState } from 'react'
import { Link } from "react-router-dom";
import './Signup.css'
import { apiService } from '../../service/Service';
import DSButton from '../../components/ds-button/DSButton';
import { Grid, Typography } from '@mui/material';
import { Form, Image } from 'react-bootstrap';
import DSInput from '../../components/ds-input/DSInput';
// import DSRadio from '../../components/ds-radio/DSRadio';
import { FaUser } from 'react-icons/fa';
import DSSnackbar from '../../components/ds-snackbar/DSSnackbar';


const url = process.env.REACT_APP_API_BASE_URL;

const Signup = () => {

  // const genderOption = [{ value: "male", label: "Male", color: "black" },
  // { value: "female", label: "Female", color: "black" },
  // { value: "other", label: "Other", color: "black" }
  // ]
  // const [Error, setError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resData, setData] = useState('');
  const [isSnackBar, setIsSnackBar] = useState(false);
  const [snackBarMsg, setSnackBarMsg] = useState('');
  const initialFormData = {
    firstname: '',
    lastname: '',
    gender: '',
    dob: '',
    email: '',
    mobileno: '',
    password: '',
  };
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "radio" ? (checked ? value : "") : value
    });

  };


  const signupUrl = (`${url}/user/signup`);
  const handleSubmit = async (e) => {

    e.preventDefault();
    const PasswordValidation = validation(formData.password, confirmPassword);
    if (PasswordValidation) {
      await apiService.post(signupUrl, formData)
        .then((response) => {
          console.log(response)
          setData(response);
          const status = resData.status;
          if (status === 200 || status === 201) {
            setSnackBarMsg(response.data.message)
            setIsSnackBar(true);
            window.location.href = '/login';
          }
          setFormData(initialFormData);
        })
        .catch((error) => {
          setSnackBarMsg(error.response.data.message)
          setIsSnackBar(true);
        })
    } else {
      setSnackBarMsg("Password mismatch")
      setIsSnackBar(true);
    }
  };

  const validation = (password, confirmPassword) => {
    if (password !== confirmPassword || password === '' || confirmPassword === '') {
      return false;
    } else {
      return true;
    }
  }
  return (
    <div className='maindiv'>
      {
        isSnackBar &&
        <DSSnackbar
          open={isSnackBar}
          message={snackBarMsg}
          variant="error"
          onClose={() => setIsSnackBar(false)}
        />
      }
      <Form className='fm-signup' onSubmit={handleSubmit}>
        <Grid container className='maingrid' spacing={2}>
          <Grid className='leftgrid' item xs={6}>
            <Image className='img' src={require('../../asserts/images/signup.webp')} alt='Second Slide'>
            </Image>
          </Grid>

          {/* Right Side Signup form */}

          <Grid item xs={6} className='rightgrid'>
            <Form.Group className='formGroup'>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography className='title'>Signup</Typography>
                </Grid>
                <Grid item xs={6}>
                  <DSInput
                    label='First Name'
                    type='text'
                    name='firstname'
                    value={formData.firstname}
                    onChange={handleChange}
                    required={true}></DSInput>
                </Grid>
                <Grid item xs={6}>
                  <DSInput
                    label='Last Name'
                    type='text'
                    name='lastname'
                    value={formData.lastname}
                    onChange={handleChange}
                    required={true}></DSInput>
                </Grid>
                {/* <Grid item xs={12}>
                    <DSRadio label='Gender' option={genderOption} onchange={handleChange}></DSRadio>
                        </Grid> */}
                {/* <Grid item xs={6}>
                    <DSInput
                      label='Date of Birth'
                      type='date'
                      name='dob'
                      value={formData.dob}
                      onChange={handleChange}
                      required={true}></DSInput>

                  </Grid> */}
                <Grid item xs={6}>
                  <DSInput
                    label='Mobile Number'
                    type='number'
                    name='mobileno'
                    value={formData.mobileno}
                    onChange={handleChange}
                    required={true}></DSInput>
                </Grid>
                <Grid item xs={6}>
                  <DSInput
                    label='Email'
                    type='email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    icon={<FaUser />}
                    required={true}></DSInput>
                </Grid>
                <Grid item xs={6}>
                  <DSInput
                    label='Password'
                    type='password'
                    name='password'
                    value={formData.password}
                    onChange={handleChange}
                    required={true}></DSInput>
                </Grid>
                <Grid item xs={6}>
                  <DSInput
                    label='Confirm Password'
                    type='text'
                    name='password'
                    value={confirmPassword}
                    required={true}
                    onChange={(e) => setConfirmPassword(e.target.value)}></DSInput>
                </Grid>
                <Grid item xs={12}>
                  <div>
                    <DSButton type='submit' text="Signup" className='fw-bold' ></DSButton>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <div className=" create-acct-signup ">
                    <span>Have already an account?</span>
                    <Link className='create-link-signup' to="/login">Login</Link>
                  </div>
                </Grid>
              </Grid>
            </Form.Group>
          </Grid>
        </Grid>
      </Form>
    </div>
  )
}

export default Signup