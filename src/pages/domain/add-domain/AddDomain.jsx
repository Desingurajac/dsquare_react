import { Grid, Typography } from '@mui/material'
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap';
import DSInput from '../../../components/ds-input/DSInput';
import DSSwitch from '../../../components/ds-switch/DSSwitch';
import { DSTextArea } from '../../../components/ds-textarea/DSTextArea';
import DSButton from '../../../components/ds-button/DSButton';
import { getCountry } from '../../../service/CommonApi';
import { apiService } from '../../../service/Service';
import { useNavigate } from 'react-router-dom';
import './AddDomain.css';
import { encryptData } from '../../../utils/nodeRSA';
import DSSnackbar from '../../../components/ds-snackbar/DSSnackbar';

const AddDomain = () => {

    const navigate = useNavigate();
    //Snack Bar
    const url = process.env.REACT_APP_API_BASE_URL;
    const [variant, setVariant] = useState();
    const [snackBarMsg, setSnackBarMsg] = useState();
    const [isSnackBar, setIsSnackBar] = useState();
    const initialFormData = {
        countryid: "",
        domainName: "",
        isActive: true,
        description: ""
    }
    const [formData, setFormData] = useState(initialFormData);
    const [country, setCountry] = useState();


    const getCountryList = async () => {
        try {
            const response = await getCountry();
            const status = response.status;
            if (status === 200 || status === 201) {
                const token = response.data.token;
                const decodeToken = jwtDecode(token);
                const data = decodeToken.Data;
                const formatedOption = data.map(item => ({
                    value: item.id,
                    label: item.name
                }))
                setCountry(formatedOption)
            }
        } catch (error) {
            setSnackBarMsg(error.message);
            setVariant('error');
            setIsSnackBar(true);
        }
    }

    useEffect(() => {
        getCountryList();
    }, [])

    const handleViewDomain = () => {
        navigate('/view-domain')
    }

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((PrevData) => ({
            ...PrevData,
            [name]: type === "checkbox" ? checked : value
        }));

    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const encryptedData = encryptData(formData);
        const payload = { data: encryptedData }
        try {
            const addDomainUrl = `${url}/domain/add-domain`;
            await apiService.post(addDomainUrl, payload)
                .then((response) => {
                    const status = response.status;
                    if (status === 200 || status === 201) {
                        const token = response.data.token;
                        const decodeToken = jwtDecode(token);
                        setSnackBarMsg(decodeToken.message);
                        setVariant('success');
                        setIsSnackBar(true);
                        setFormData(initialFormData);

                    }
                })

        } catch (error) {
            setSnackBarMsg(error.response.data.message);
            setVariant('error');
            setIsSnackBar(true);
        }

    }
    return (
        <div>
            {
                isSnackBar &&
                <DSSnackbar
                    open={isSnackBar}
                    message={snackBarMsg}
                    variant={variant}
                    onClose={() => setIsSnackBar(false)}
                />
            }
            <Form className='frmpad' onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography className='fw-bold'>Add Domain</Typography>
                    </Grid>
                    <Grid className='view-grid' item xs={6}>
                        <DSButton
                            type='button'
                            text='View'
                            className='fw-bold view-btn'
                            onClick={handleViewDomain}
                        ></DSButton>
                    </Grid>
                    <Grid item xs={4}>
                        <DSInput
                            label='Country'
                            type='select'
                            name='countryid'
                            value={formData.countryid}
                            onChange={handleChange}
                            select={true}
                            options={country}
                            addoption={false}
                            required={true}></DSInput>
                    </Grid>
                    <Grid item xs={4}>
                        <DSInput
                            label='Domain Name'
                            type='text'
                            name='domainName'
                            value={formData.domainName}
                            onChange={handleChange}
                            required={true}></DSInput>
                    </Grid>
                    <Grid item xs={4}>
                        <DSSwitch
                            label='IsActive'
                            checked={formData.isActive}
                            onChange={handleChange}
                            name='isActive'></DSSwitch>
                    </Grid>
                    <Grid item xs={6}>
                        <DSTextArea
                            name='description'
                            className='textfield'
                            value={formData.description}
                            onChange={handleChange}
                            placeholder='Enter the Description'
                            minrows='1'
                            required={true}></DSTextArea>
                    </Grid>
                    <Grid item xs={12}>
                        <DSButton type='submit' text='Add'></DSButton>                </Grid>
                </Grid>
            </Form>

        </div>
    )
}

export default AddDomain
