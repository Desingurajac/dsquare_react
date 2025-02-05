import { Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import DSInput from '../../components/ds-input/DSInput'
import DSSwitch from '../../components/ds-switch/DSSwitch'
import { DSTextArea } from '../../components/ds-textarea/DSTextArea'
import DSButton from '../../components/ds-button/DSButton';
import { apiService } from '../../service/Service'
import { jwtDecode } from 'jwt-decode'
import SnackBar from '../../components/snackbar/SnackBar'

const Role = () => {
    const url = process.env.REACT_APP_API_BASE_URL;
    const [isSnackBar, setIsSnackBar] = useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    })
    const [snackBarMsg, setSnackBarMsg] = useState('')
    const initialFormData = {
        roleName: "",
        description: "",
        permission: [],
        isactive: true,
        userid: Number(localStorage.getItem("userId"))
      };
    const [formData, setFormData] = useState(initialFormData)
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value

        }));
        //    console.log(" ===>",formData.rolename )
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const addRoleUrl = `${url}/role/add-new-role`;
                await apiService.post(addRoleUrl, formData)
                .then((Response) => {
                    const status = Response.status;
                    if (status === 200 || status === 201) {
                        const token = Response.data.Token;
                        const decodeToken = jwtDecode(token);
                        setSnackBarMsg(decodeToken.message)
                        setIsSnackBar({ open: true });
                        setTimeout(() => {
                            setIsSnackBar({ open: false });
                        }, 3000);

                    }
                })
                setFormData(initialFormData)
        } catch (error) {

        }



    }
    return (
        <div>
            <Form className='frmpad' onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography className='fw-bold'>
                            Add New Role
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <DSInput label='Role Name' type='text' name='roleName' value={formData.roleName} onChange={handleChange} required={true} ></DSInput>
                    </Grid>
                    <Grid item xs={4}>
                        <DSSwitch label='IsActive' checked={formData.isactive} onChange={handleChange} name='isactive'></DSSwitch>
                    </Grid>
                    <Grid item xs={4}>
                        <DSTextArea name='description' className='textfeild' value={formData.description} onChange={handleChange} placeholder='Enter the Description' minrows='1' required={true}></DSTextArea>
                    </Grid>
                    <Grid item xs={12}>
                        <DSButton type='submit' text='Save'  ></DSButton>
                    </Grid>
                </Grid>
            </Form>
            {
                isSnackBar.open &&
                <SnackBar
                    message={snackBarMsg}
                    variant="success"
                />
            }
        </div>
    )
}

export default Role
