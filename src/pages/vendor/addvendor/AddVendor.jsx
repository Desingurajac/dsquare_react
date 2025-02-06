import { Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { Form } from 'react-bootstrap'
import DSInput from '../../../components/ds-input/DSInput'
import DSButton from '../../../components/ds-button/DSButton'
import { getCity, getCountry, getState } from '../../../service/CommonApi'
import { jwtDecode } from 'jwt-decode'
import './AddVendor.css'
import { apiService } from '../../../service/Service'
import SnackBar from '../../../components/snackbar/SnackBar'

const AddVendor = () => {
    const url = process.env.REACT_APP_API_BASE_URL;
    const [isSnackBar, setIsSnackBar] = useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const [variant, setVariant] = useState('');
    const [snackBarMsg, setSnackBarMsg] = useState('');
    const [vendorType, setVendorType] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [addVendorType, setAddVendorType] = useState('')
    const [country, setCountry] = useState([]);
    const [state, setState] = useState([]);
    const [city, setCity] = useState([]);
    const [brand, setBrand] = useState([]);
    const formRef = useRef(null);
    const [formData, setFormData] = useState({
        vendorname: "",
        vendortype_id: "",
        creditterm: "",
        leadtime: "",
        address1: "",
        address2: "",
        countryid: "",
        stateid: "",
        cityid: "",
        zipcode: "",
        mobileno: "",
        contactno: "",
        emailid: "",
        brandid: ""
    });


    const fetchVedorTypeList = () => {

        const getVendorType = (`${url}/vendor/get-vendor-type`);
        try {
            apiService.get(getVendorType)
                .then((response) => {
                    const status = response.status;
                    if (status === 200 || status === 201) {
                        const token = response.data.token;
                        const decodeToken = jwtDecode(token);
                        const data = decodeToken.data;
                        const formatedOption = data.map(item => ({
                            value: item.vendortype_id,
                            label: item.vendortype
                        }))
                        setVendorType(formatedOption);
                    }
                })
        } catch (error) {
            setSnackBarMsg(error.message);
            setVariant('error');
            setIsSnackBar({ open: true });
            setTimeout(() => {
                setIsSnackBar({ open: false });
                setVariant('');
            }, 3000);
        }
    }

    const fetchbrandList = async () => {
        try {
            const getBrandListUrl = `${url}/product/brand-list`;
            const response = await apiService.get(getBrandListUrl);
            const status = response.status;
            if (status === 200 || status === 201) {
                const token = response.data.token;
                const decodeToken = jwtDecode(token);
                const data = decodeToken.Data;
                const formatedOption = data.map(item => ({
                    value: item.brandId,
                    label: item.brandName
                }));
                setBrand(formatedOption)
            }

        } catch (error) {
            console.error('Error fetching product list:', error.message);
        }
    }

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
            setIsSnackBar({ open: true });
            setTimeout(() => {
                setIsSnackBar({ open: false });
                setVariant('');
            }, 3000);
        }
    }

    const fetchCityList = async (id) => {

        try {
            const payload = { state_id: id }
            const response = await getCity(payload);
            const status = response.status;
            if (status === 200 || status === 201) {
                const token = response.data.token;
                const decodeToken = jwtDecode(token);
                const data = decodeToken.Data;
                const formatedOption = data.map(item => ({
                    value: item.id,
                    label: item.name
                }))
                setCity(formatedOption)
            }
        } catch (error) {

        }

    }

    const fetchStateList = async (id) => {
        try {
            const payload = { country_id: id }
            const response = await getState(payload);
            const status = response.status;
            if (status === 200 || status === 201) {
                const token = response.data.token;
                const decodeToken = jwtDecode(token);
                const data = decodeToken.Data;
                const formatedOption = data.map(item => ({
                    value: item.id,
                    label: item.name
                }));
                setState(formatedOption)
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        getCountryList();
        fetchVedorTypeList();
        fetchbrandList();
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            const addVendorUrl = (`${url}/vendor/add-vendor-details`);
            apiService.post(addVendorUrl, formData)
                .then((response) => {
                    const status = response.status;
                    if (status === 200 || status === 201) {
                        const token = response.data.token;
                        const decodeToken = jwtDecode(token);
                        setSnackBarMsg(decodeToken.message);
                        setVariant('success');
                        setIsSnackBar({ open: true });
                        formRef.current.reset();
                        setTimeout(() => {
                            setIsSnackBar({ open: false });
                            setVariant('');
                        }, 3000);
                    }


                })
        } catch (error) {
            setSnackBarMsg(error.message);
            setVariant('error');
            setIsSnackBar({ open: true });
            setTimeout(() => {
                setIsSnackBar({ open: false });
                setVariant('');
            }, 3000);
        }

    }

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setFormData((PrevData) => ({
            ...PrevData,
            [name]: value,

        }))
    }

    const handleOpenAddvendorDialog = () => {
        setDialogOpen((prevData) => !prevData)
    }

    const handleAddVendorType = () => {
        try {
            const addVendorTypeUrl = (`${url}/vendor/add-vendor-type`);
            const payload = { vendortype: addVendorType };
            apiService.post(addVendorTypeUrl, payload)
                .then((response) => {
                    const status = response.status;
                    if (status === 200 || status === 201) {
                        const token = response.data.Token;
                        const decodeToken = jwtDecode(token);
                        setSnackBarMsg(decodeToken.message)
                        fetchVedorTypeList();
                        setVariant('success');
                        setIsSnackBar({ open: true });
                        setTimeout(() => {
                            setIsSnackBar({ open: false });
                            setVariant('');
                        }, 3000);
                    }

                })
        } catch (error) {
            setSnackBarMsg(error.message);
            setVariant('error');
            setIsSnackBar({ open: true });
            setTimeout(() => {
                setIsSnackBar({ open: false });
                setVariant('');
            }, 3000);
        }
    }

    const handleChangeAddVendor = (val) => {
        const capVendorType = val.charAt(0).toUpperCase() + val.slice(1);
        setAddVendorType(capVendorType);
    }
    return (
        <div>
            <div>
                <Form className='frmpad' ref={formRef} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography
                                className='fw-bold'>
                                Add Vendor Details:
                            </Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <DSInput label='Vendor Name'
                                type='text'
                                name='vendorname'
                                value={formData.vendorname}
                                onChange={handleChange}
                                required={true} >
                            </DSInput>
                        </Grid>
                        <Grid item xs={3}>
                            <DSInput
                                label='Vendor Type'
                                type='select'
                                name='vendortype_id'
                                value={formData.vendortype_id}
                                onChange={handleChange}
                                select={true}
                                options={vendorType}
                                addoption={true}
                                onClick={handleOpenAddvendorDialog}
                                addlabel='Add Vendor Type'
                                required={true}></DSInput>
                        </Grid>
                        <Grid item xs={3}>
                            <DSInput label='Credit Terms'
                                type='number'
                                name='creditterm'
                                value={formData.creditterm}
                                onChange={handleChange}
                                required={true} >
                            </DSInput>
                        </Grid>
                        <Grid item xs={3}>
                            <DSInput label='Lead Time'
                                type='number'
                                name='leadtime'
                                value={formData.leadtime}
                                onChange={handleChange}
                                required={true} >
                            </DSInput>
                        </Grid>
                        <Grid item xs={3}>
                            <DSInput label='Address1'
                                type='text'
                                name='address1'
                                value={formData.address1}
                                onChange={handleChange}
                                required={true} >
                            </DSInput>
                        </Grid>
                        <Grid item xs={3}>
                            <DSInput label='Address2'
                                type='text'
                                name='address2'
                                value={formData.address2}
                                onChange={handleChange}
                            >
                            </DSInput>
                        </Grid>
                        <Grid item xs={3}>
                            <DSInput
                                label='Country'
                                type='select'
                                name='countryid'
                                value={formData.countryid}
                                onChange={handleChange}
                                select={true}
                                options={country}
                                addoption={false}
                                addlabel='Add Country'
                                onselect={fetchStateList}
                                required={true}></DSInput>
                        </Grid>
                        <Grid item xs={3}>
                            <DSInput
                                label='State'
                                type='select'
                                name='stateid'
                                value={formData.stateid}
                                onChange={handleChange}
                                select={true}
                                options={state}
                                addoption={false}
                                addlabel='Add State'
                                onselect={fetchCityList}
                                required={true}></DSInput>
                        </Grid>
                        <Grid item xs={3}>
                            <DSInput
                                label='City'
                                type='select'
                                name='cityid'
                                value={formData.cityid}
                                onChange={handleChange}
                                select={true}
                                options={city}
                                addoption={false}
                                addlabel='Add City'
                                required={true}></DSInput>
                        </Grid>
                        <Grid item xs={3}>
                            <DSInput label='Zip Code'
                                type='number'
                                name='zipcode'
                                value={formData.zipcode}
                                onChange={handleChange}
                                required={true} >
                            </DSInput>
                        </Grid>
                        <Grid item xs={3}>
                            <DSInput label='Mobile Number'
                                type='number'
                                name='mobileno'
                                value={formData.mobileno}
                                onChange={handleChange}
                                required={true} >
                            </DSInput>
                        </Grid>
                        <Grid item xs={3}>
                            <DSInput label='Contuct Number'
                                type='number'
                                name='contactno'
                                value={formData.contactno}
                                onChange={handleChange}
                                required={true} >
                            </DSInput>
                        </Grid>
                        <Grid item xs={3}>
                            <DSInput label='Email'
                                type='email'
                                name='emailid'
                                value={formData.emailid}
                                onChange={handleChange}
                                required={true} >
                            </DSInput>
                        </Grid>
                        <Grid item xs={3}>
                            <DSInput
                                label='Selec Brand Name'
                                type='select'
                                name='brandid'
                                value={formData.brandid}
                                onChange={handleChange}
                                select={true}
                                options={brand}
                                required={true}></DSInput>
                        </Grid>

                        <Grid item xs={12}>
                            <DSButton type="submit" text='Add' className='fw-bold'></DSButton>
                        </Grid>
                    </Grid>
                </Form>
            </div>
            {dialogOpen &&
                <div>
                    <Dialog open={dialogOpen} onClose={handleOpenAddvendorDialog} fullWidth maxWidth="sm">
                        <DialogTitle >Add Vendor Type</DialogTitle>
                        <DialogContent className='dcontent'>
                            <DSInput
                                label='Vendor Type'
                                type='text'
                                name='newVendorType'
                                value={addVendorType}
                                onChange={(e) => { handleChangeAddVendor(e.target.value) }}
                                required={true} >
                            </DSInput>
                        </DialogContent>
                        <DialogActions>
                            <DSButton type='button' text='Add' className='fw-bold' onClick={handleAddVendorType}></DSButton>
                        </DialogActions>
                    </Dialog>
                </div>
            }

            {
                isSnackBar.open &&
                <SnackBar
                    message={snackBarMsg}
                    variant={variant}
                />
            }

        </div>
    )
}

export default AddVendor
