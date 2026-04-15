import React, { useEffect, useState } from 'react'
import './Signin.css'
import { Form, Image } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { apiService } from '../../service/Service';
import { jwtDecode } from 'jwt-decode';
import DSButton from '../../components/ds-button/DSButton.jsx';
import DSInput from '../../components/ds-input/DSInput.jsx';
import { FaUser } from "react-icons/fa";
import { Checkbox, FormControlLabel, Grid, Typography } from '@mui/material';
import { RiErrorWarningFill } from "react-icons/ri";
import DSPopover from '../../components/ds-popover/DSPopover.jsx';


const url = process.env.REACT_APP_API_BASE_URL;

export const Signin = () => {
  const remeberWarning = "We'll keep you signed in on this device. For your account's security, we'll still ask for your password if you're updating sensitive information. Use this option only on your personal computer or device."
  const [error, setError] = useState('');
  // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [rememberMe, setRememberMe] = useState(false);

  const initialFormData = {
    email: "",
    password: ""
  };
  const [valueError, setValueError] = useState('');
  const [formData, setFormData] = useState(initialFormData);
  // const [warningPop, setWarningPop] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  useEffect(() => {
    const storedEmail = localStorage.getItem("rememberedEmail");
    const storedPassword = localStorage.getItem("rememberedPassword");
    const storedRememberMe = localStorage.getItem("rememberMe");
    if (storedRememberMe === "true") {
      setFormData({
        email: storedEmail || "",
        password: storedPassword || ""
      })
      setRememberMe(true);
    }
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const loginUrl = (`${url}/user/login`);
    apiService.post(loginUrl, formData)
      .then((response) => {
        const status = response.status;
        if (status === 200) {
          const token = response.data.Token;
          localStorage.setItem('authToken', token);
          const decodeToken = jwtDecode(token);
          localStorage.setItem('userId', decodeToken.userid);
          if (rememberMe) {
            localStorage.setItem("rememberedEmail", formData.email);
            localStorage.setItem("rememberedPassword", formData.password);
            localStorage.setItem("rememberMe", "true");
          } else {
            localStorage.removeItem("rememberedEmail");
            localStorage.removeItem("rememberedPassword");
            localStorage.removeItem("rememberMe");
          }

          window.location.href = '/dashboard';
        }

      })
      .catch((error) => {
        const errorMessage = error.response?.data?.message || error.message || "An unknown error occurred";
        setError(errorMessage);
      })
  };

  const handleCheckMail = async (e) => {
    const mailCheckUrl = (`${url}/user/email-check`)
    const email = e.target.value;
    const payload = { email: email };
    try {
      await apiService.get(mailCheckUrl, payload)
        .then((response) => {
          const status = response.status;
          if (status === 200 || status === 201) {
            const token = response.data.Token;
            const decodeData = jwtDecode(token);
            setValueError(decodeData.message)
          }
        })

    } catch (error) {
      setValueError(error.message);
    }
  }
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value

    }));
    setValueError('');
  }

  const handleToggleValue = (checked) => {
    setRememberMe(checked)
  }

  const handleWarningOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleWarningClose = () => {
    setAnchorEl(null)
  }
  // const mailHandling = async (e) => {
  //   const valueEmail = e.target.value;
  //   // setEmail(valueEmail);
  //   if (emailRegex.test(valueEmail)) {
  //     setError("")
  //   } else {
  //     setError("Invalid email format");
  //   }

  // }

  return (
    <div className='bgc'>
      <div className='container'>
        <Grid container className='mainGrid'>
          {/* Left Side - Image */}
          <Grid item xs={6} className='imageGrid'>
            <Image className='img' src={require('../../asserts/images/login.webp')}
              alt='Second Slide'></Image>
          </Grid>

          {/* Right Side - Login Form */}

          <Grid item xs={6}>
            <Form className='form mainform' onSubmit={handleSubmit}>
              <Form.Group>
                <Typography className='title'>Login</Typography>
                {
                  error && <p className="errorcl">{error}</p>

                }
                <Grid item xs={12}>
                <div className='form-wrapper elepadding'>
                  <DSInput
                    label='Email'
                    type='email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    required={true}
                    icon={<FaUser />}
                    onblur={handleCheckMail}>
                  </DSInput>
                  {
                    valueError && <p className='error errorcl'>{valueError}</p>
                  }
                </div>
                </Grid>
                <Grid item xs={12}>
                <div className='form-wrapper elepadding'>
                  <DSInput
                    label='Password'
                    type='password'
                    name='password'
                    className='custom-password-icon'
                    value={formData.password}
                    onChange={handleChange}
                    required={true} >
                  </DSInput>
                </div>
                </Grid>
               <Grid item xs={12}>
                <Grid container spacing={2}>
               <Grid item xs={6}>
                <div className='elepadding'>                
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={rememberMe}
                          onClick={(e) => handleToggleValue(e.target.checked)}
                          color="primary"
                        />
                      }
                      label="Keep me signed in."
                    /><RiErrorWarningFill onClick={handleWarningOpen} />
                     </div>
                    </Grid>
                    <DSPopover anchorEl={anchorEl} open={open} onClose={handleWarningClose}>
                      <Typography sx={{ p: 2 }}>{remeberWarning}</Typography>
                    </DSPopover>
                   <Grid item xs={6}>
                   <div className='elepadding'>
                    <Link className="frgt-pass-link" to="/forgotpassword">Forgot Password?</Link>
                  
                  </div>
                </Grid>
                </Grid>
                </Grid>
                <Grid item xs={12}>
                <div>
                  <DSButton type="submit" text="Login"></DSButton>
                </div>
                </Grid>
                <Grid item xs={12}>
                <div className="create-acct">
                  <span>Don't have an account?</span>
                  <Link className='create-link' to="/signup">Create an account</Link>
                </div>
                </Grid>
              </Form.Group>
            </Form>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}


