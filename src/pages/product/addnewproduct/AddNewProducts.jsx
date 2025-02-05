import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid';
import { Button, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Switch, TextareaAutosize, TextField, Typography, Card, CardHeader } from '@mui/material';
import './AddNewProducts.css';
import { Form } from 'react-bootstrap';
import { apiService } from '../../../service/Service';
import { IoMdAdd } from "react-icons/io";
import { jwtDecode } from 'jwt-decode';
import SnackBar from '../../../components/snackbar/SnackBar';
import DSButton from '../../../components/ds-button/DSButton';

const AddNewProducts = () => {

  const url = process.env.REACT_APP_API_BASE_URL;
  const [error, setError] = useState('');
  const [addNewBrand, setAddNewBrand] = useState('')
  const [addMainCategory, setAddMainCategory] = useState('')
  const [addCategory1, setAddCategory1] = useState('')
  const [addCategory2, setAddCategory2] = useState('')
  const [addCategory3, setAddCategory3] = useState('')
  const [addCategory4, setAddCategory4] = useState('')
  const [addCategory5, setAddCategory5] = useState('')

  const [brandList, setBrandList] = useState([])
  const [mainCategoryList, setMainCategoryList] = useState([])
  const [category1List, setCategory1List] = useState([])
  const [category2List, setCategory2List] = useState([])
  const [category3List, setCategory3List] = useState([])
  const [category4List, setCategory4List] = useState([])
  const [category5List, setCategory5List] = useState([])

  const [isOpenAddBrand, setIsOpenAddBrand] = useState(false)
  const [isOpenAddCategory, setIsOpenAddCategory] = useState(false)
  const [isOpenAddCategory1, setIsOpenAddCategory1] = useState(false)
  const [isOpenAddCategory2, setIsOpenAddCategory2] = useState(false)
  const [isOpenAddCategory3, setIsOpenAddCategory3] = useState(false)
  const [isOpenAddCategory4, setIsOpenAddCategory4] = useState(false)
  const [isOpenAddCategory5, setIsOpenAddCategory5] = useState(false)
  const [isSnackBar, setIsSnackBar] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  })
  const [snackBarMsg, setSnackBarMsg] = useState('')
  const [formData, setFormData] = useState({
    brandId: "",
    productName: "",
    mainCategory: "",
    subCategory1: "",
    subCategory2: "",
    subCategory3: "",
    subCategory4: "",
    subCategory5: "",
    price: "",
    discount: "",
    stockQty: "",
    minimumStockQty: "",
    maximumStockQty: "",
    size: "",
    color: "",
    images: "",
    weight: "",
    shippingCost: "",
    distributorId: "",
    description: "",
    isActive: true
  });



  const fetchbrandList = async () => {
    try {
      const getBrandListUrl = `${url}/product/brand-list`;
      const response = await apiService.get(getBrandListUrl);
      const status = response.status;
      if (status === 200 || status === 201) {
        const token = response.data.token;
        const decodeToken = jwtDecode(token);
         setBrandList(decodeToken.Data)
      }
    } catch (error) {
      console.error('Error fetching product list:', error.message);
    }
  }

  useEffect(() => {
    fetchbrandList();
  }, []);
  const fetchMainCategoryList = async (val) => {
    try {
      const getMCListUrl = `${url}/product/main-category-list`;
      const brandid = { "brandid": val };
      const response = await apiService.get(getMCListUrl, brandid);
      const status = response.status;
      if (status === 200 || status === 201) {
        const token = response.data.token;
        const decodeToken = jwtDecode(token);
        setMainCategoryList(decodeToken.mainCategoryList)
      }
    } catch (error) {
      setError(error.message)
    }
  }

  const fetchCategory1List = async (val) => {
    try {
      const getCategory1ListUrl = `${url}/product/category1-list`;
      const paramCategory1 = { "brandid": formData.brandId, "maincategoryid": val };
      const response = await apiService.get(getCategory1ListUrl, paramCategory1);
      const status = response.status;
      if (status === 200 || status === 201) {
        const token = response.data.token;
        const decodeToken = jwtDecode(token);
        setCategory1List(decodeToken.category1list)
      }
    } catch (error) {
      setError(error.message)
    }
  }

  const fetchCategory2List = async (val) => {
    try {
      const getCategory2ListUrl = `${url}/product/category2-list`;
      const paramCategory2 = { "brandid": formData.brandId, "maincategoryid": formData.mainCategory, "category1id": val };
      const response = await apiService.get(getCategory2ListUrl, paramCategory2);
      const status = response.status;
      if (status === 200 || status === 201) {
        const token = response.data.token;
        const decodeToken = jwtDecode(token);
        setCategory2List(decodeToken.category2list)
      }
    } catch (error) {
      setError(error.message)
    }
  }

  const fetchCategory3List = async (val) => {
    try {
      const getCategory3ListUrl = `${url}/product/category3-list`;
      const paramCategory3 = { "brandid": formData.brandId, "maincategoryid": formData.mainCategory, "category1id": formData.subCategory1, "category2id": val };
      const response = await apiService.get(getCategory3ListUrl, paramCategory3);
      const status = response.status;
      if (status === 200 || status === 201) {
        const token = response.data.token;
        const decodeToken = jwtDecode(token);
        setCategory3List(decodeToken.category3list)
      }
    } catch (error) {
      setError(error.message)
    }
  }

  const fetchCategory4List = async (val) => {
    try {
      const getCategory4ListUrl = `${url}/product/category4-list`;
      const paramCategory4 = { "brandid": formData.brandId, "maincategoryid": formData.mainCategory, "category1id": formData.subCategory1, "category2id": formData.subCategory2, "category3id": val };
      const response = await apiService.get(getCategory4ListUrl, paramCategory4);
      const status = response.status;
      if (status === 200 || status === 201) {
        const token = response.data.token;
        const decodeToken = jwtDecode(token);
        setCategory4List(decodeToken.category4list)
      }
    } catch (error) {
      setError(error.message)
    }
  }

  const fetchCategory5List = async (val) => {
    try {
      const getCategory5ListUrl = `${url}/product/category5-list`;
      const paramCategory5 = {
        "brandid": formData.brandId, "maincategoryid": formData.mainCategory, "category1id": formData.subCategory1,
        "category2id": formData.subCategory2, "category3id": formData.subCategory3, "category4id": val
      };
      const response = await apiService.get(getCategory5ListUrl, paramCategory5);
      const status = response.status;
      if (status === 200 || status === 201) {
        const token = response.data.token;
        const decodeToken = jwtDecode(token);
        setCategory5List(decodeToken.category5list)
      }
    } catch (error) {
      setError(error.message)
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const addProductUrl = (`${url}/product/add-new-products`);
     apiService.post(addProductUrl, formData)
      .then((response) => {
        const status = response.status;
        if (status === 200 || status === 201) {
          window.location.href = '/dashboard';
        }
      })
  };

  const productList = () => {
    window.location.href = '/product-list'
  }

  // Add New Brand
  const handleAddBrandModal = () => {
    setIsOpenAddBrand(true);
  }
  const handleCloseAddBrandModal = () => {
    setIsOpenAddBrand(false);
  }
  const handleChangeNewBrand = (val) => {
    const capBrandName = val.charAt(0).toUpperCase() + val.slice(1);
    setAddNewBrand(capBrandName);
  }
  const handleAddBrandSubmit = () => {
    const addNewBrandtUrl = (`${url}/product/add-new-brand`);
    const newBrand = { brandName: addNewBrand }
    apiService.post(addNewBrandtUrl, newBrand)
      .then((response) => {
        const status = response.status;
        if (status === 200 || status === 201) {
          const token = response.data.Token;
          const decodeToken = jwtDecode(token);
          setBrandList(decodeToken.brandList)
          setSnackBarMsg(decodeToken.message)
          fetchbrandList();
          setIsSnackBar({ open: true });
          setTimeout(() => {
            setIsSnackBar({ open: false });
          }, 3000);
        }

        setIsOpenAddBrand(false)
      })

  }

  //Add Main Category
  const handleAddCategoryModal = () => {
    setIsOpenAddCategory(true);
  }
  const handleCloseCategoryModal = () => {
    setIsOpenAddCategory(false);
  }
  const handleChangeAddMainCategory = (val) => {
    const capMainCate = val.charAt(0).toUpperCase() + val.slice(1);
    setAddMainCategory(capMainCate);
  }
  const handleAddMCSubmit = () => {
    const addMCUrl = (`${url}/product/add-new-main-category`);
    const newMainCategory = { brandid: formData.brandId, maincategoryname: addMainCategory }
    apiService.post(addMCUrl, newMainCategory)
      .then((response) => {
        const status = response.status;
        if (status === 200 || status === 201) {
          const token = response.data.Token;
          const decodeToken = jwtDecode(token);
          console.log("decodeData", decodeToken)
          setMainCategoryList(decodeToken.brandList)
          setSnackBarMsg(decodeToken.message)
          setIsSnackBar({ open: true });
          fetchMainCategoryList();
          setTimeout(() => {
            setIsSnackBar({ open: false });
          }, 3000);
        }

        setIsOpenAddBrand(false)
      })

  }

  //Add Category1
  const handleAddCategory1Modal = () => {
    setIsOpenAddCategory1(true);
  }
  const handleCloseCategory1Modal = () => {
    setIsOpenAddCategory1(false);
  }
  const handleChangeAddCategory1 = (val) => {
    const capCategory1 = val.charAt(0).toUpperCase() + val.slice(1);
    setAddCategory1(capCategory1);
  }
  const handleAddCategory1Submit = () => {
    const addCCategory1Url = (`${url}/product/add-new-category1`);
    const newCategory1 = { brandid: formData.brandId, maincategoryid: formData.mainCategory, category1name: addCategory1 }
    apiService.post(addCCategory1Url, newCategory1)
      .then((response) => {
        const status = response.status;
        if (status === 200 || status === 201) {
          const token = response.data.Token;
          const decodeToken = jwtDecode(token);
          setCategory1List(decodeToken.brandList)
          setSnackBarMsg(decodeToken.message)
          setIsSnackBar({ open: true });
          fetchCategory1List(formData.mainCategory);
          setTimeout(() => {
            setIsSnackBar({ open: false });
          }, 3000);
        }

        setIsOpenAddCategory1(false)
      })

  }

  //Add Category2
  const handleAddCategory2Modal = () => {
    setIsOpenAddCategory2(true);
  }
  const handleCloseCategory2Modal = () => {
    setIsOpenAddCategory2(false);
  }
  const handleChangeAddCategory2 = (val) => {
    const capCategory2 = val.charAt(0).toUpperCase() + val.slice(1);
    setAddCategory2(capCategory2);
  }
  const handleAddCategory2Submit = () => {
    const addCCategory2Url = (`${url}/product/add-new-category2`);
    const newCategory2 = { brandid: formData.brandId, maincategoryid: formData.mainCategory, category1id: formData.subCategory1, category2name: addCategory2 }
    apiService.post(addCCategory2Url, newCategory2)
      .then((response) => {
        const status = response.status;
        if (status === 200 || status === 201) {
          const token = response.data.Token;
          const decodeToken = jwtDecode(token);
          setCategory2List(decodeToken.brandList)
          setSnackBarMsg(decodeToken.message)
          setIsSnackBar({ open: true });
          fetchCategory2List(formData.mainCategory);
          setTimeout(() => {
            setIsSnackBar({ open: false });
          }, 3000);
        }

        setIsOpenAddCategory2(false)
      })

  }


  //Add Category3
  const handleAddCategory3Modal = () => {
    setIsOpenAddCategory3(true);
  }
  const handleCloseCategory3Modal = () => {
    setIsOpenAddCategory3(false);
  }
  const handleChangeAddCategory3 = (val) => {
    const capCategory3 = val.charAt(0).toUpperCase() + val.slice(1);
    setAddCategory3(capCategory3);
  }
  const handleAddCategory3Submit = () => {
    const addCCategory3Url = (`${url}/product/add-new-category3`);
    const newCategory3 = {
      brandid: formData.brandId, maincategoryid: formData.mainCategory, category1id: formData.subCategory1,
      category2id: formData.subCategory2, category3name: addCategory3
    }
    apiService.post(addCCategory3Url, newCategory3)
      .then((response) => {
        const status = response.status;
        if (status === 200 || status === 201) {
          const token = response.data.Token;
          const decodeToken = jwtDecode(token);
          setCategory3List(decodeToken.brandList)
          setSnackBarMsg(decodeToken.message)
          setIsSnackBar({ open: true });
          fetchCategory3List(formData.mainCategory);
          setTimeout(() => {
            setIsSnackBar({ open: false });
          }, 3000);
        }

        setIsOpenAddCategory3(false)
      })

  }

  //Add Category4
  const handleAddCategory4Modal = () => {
    setIsOpenAddCategory4(true);
  }
  const handleCloseCategory4Modal = () => {
    setIsOpenAddCategory4(false);
  }
  const handleChangeAddCategory4 = (val) => {
    const capCategory4 = val.charAt(0).toUpperCase() + val.slice(1);
    setAddCategory4(capCategory4);
  }
  const handleAddCategory4Submit = () => {
    const addCCategory4Url = (`${url}/product/add-new-category4`);
    const newCategory4 = {
      brandid: formData.brandId, maincategoryid: formData.mainCategory, category1id: formData.subCategory1,
      category2id: formData.subCategory2, category3id: formData.subCategory3, category4name: addCategory4
    }
    apiService.post(addCCategory4Url, newCategory4)
      .then((response) => {
        const status = response.status;
        if (status === 200 || status === 201) {
          const token = response.data.Token;
          const decodeToken = jwtDecode(token);
          setCategory4List(decodeToken.brandList)
          setSnackBarMsg(decodeToken.message)
          setIsSnackBar({ open: true });
          fetchCategory4List(formData.mainCategory);
          setTimeout(() => {
            setIsSnackBar({ open: false });
          }, 3000);
        }

        setIsOpenAddCategory4(false)
      })
  }

  //Add Category5
  const handleAddCategory5Modal = () => {
    setIsOpenAddCategory5(true);
  }
  const handleCloseCategory5Modal = () => {
    setIsOpenAddCategory5(false);
  }
  const handleChangeAddCategory5 = (val) => {
    const capCategory5 = val.charAt(0).toUpperCase() + val.slice(1);
    setAddCategory5(capCategory5);
  }
  const handleAddCategory5Submit = () => {
    const addCCategory5Url = (`${url}/product/add-new-category5`);
    const newCategory5 = {
      brandid: formData.brandId, maincategoryid: formData.mainCategory, category1id: formData.subCategory1,
      category2id: formData.subCategory2, category3id: formData.subCategory3, category4id: formData.subCategory4, category5name: addCategory5
    }
    apiService.post(addCCategory5Url, newCategory5)
      .then((response) => {
        const status = response.status;
        if (status === 200 || status === 201) {
          const token = response.data.Token;
          const decodeToken = jwtDecode(token);
          setCategory5List(decodeToken.brandList)
          setSnackBarMsg(decodeToken.message)
          setIsSnackBar({ open: true });
          fetchCategory5List(formData.mainCategory);
          setTimeout(() => {
            setIsSnackBar({ open: false });
          }, 3000);
        }

        setIsOpenAddCategory5(false)
      })
  }
  return (
    <div>
      {
        error && <p className="error errorcl">{error}</p>

      }
      <Form className='frmpad' onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Title */}
          <Grid item xs={12}>
            <Typography className='fw-bold'>
              Add New Product
            </Typography>
          </Grid>

          {/* Product Name */}
          <Grid item xs={3}>
            <FormControl fullWidth>
              <TextField className='textfeild'
                label="Product Name"
                type='text'
                name='productName'
                value={formData.productName}
                onChange={handleChange}
                variant="outlined"
                required
              />
            </FormControl>
          </Grid>
          {/* Brand List */}
          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Brand Name <span><em>*</em></span></InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name='brandId'
                label="Brand Name"
                value={formData.brandId}
                onChange={handleChange}
                required
              >
                <MenuItem onClick={handleAddBrandModal}><IoMdAdd /> Add Brand </MenuItem>
                {brandList && brandList.length > 0 ? (
                  brandList.map((brand) => (
                    <MenuItem key={brand.brandId} value={brand.brandId} onClick={() => { fetchMainCategoryList(brand.brandId) }}>{brand.brandName}</MenuItem>
                  ))) : (
                  <MenuItem disabled>No brands available</MenuItem>
                )
                }
              </Select>
            </FormControl>
          </Grid>

          {/* Main Category */}
          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Main Category<span><em>*</em></span></InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name='mainCategory'
                label="Main Category"
                value={formData.mainCategory}
                onChange={handleChange}
                required
              >
                <MenuItem onClick={handleAddCategoryModal}><IoMdAdd /> Add Main Category </MenuItem>
                {mainCategoryList && mainCategoryList.length > 0 ? (
                  mainCategoryList.map((maincategory) => (
                    <MenuItem key={maincategory.maincategoryid} value={maincategory.maincategoryid} onClick={() => { fetchCategory1List(maincategory.maincategoryid) }}>{maincategory.maincategoryname}</MenuItem>
                  ))) : (
                  <MenuItem disabled>No main category available</MenuItem>
                )
                }
              </Select>
            </FormControl>
          </Grid>

          {/* Sub Category1 */}
          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Sub Category1 <span><em>*</em></span></InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name='subCategory1'
                label="Sub Category1"
                value={formData.subCategory1}
                onChange={handleChange}
                required
              >
                <MenuItem onClick={handleAddCategory1Modal}><IoMdAdd /> Add Sub Category1 </MenuItem>
                {category1List && category1List.length > 0 ? (
                  category1List.map((category1) => (
                    <MenuItem key={category1.category1id} value={category1.category1id} onClick={() => { fetchCategory2List(category1.category1id) }}>{category1.category1name}</MenuItem>
                  ))) : (
                  <MenuItem disabled>No Sub Category1 available</MenuItem>
                )
                }
              </Select>
            </FormControl>
          </Grid>

          {/* Sub Category2 */}
          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Sub Category2 <span><em>*</em></span></InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name='subCategory2'
                label="Sub Category2"
                value={formData.subCategory2}
                onChange={handleChange}
                required
              >
                <MenuItem onClick={handleAddCategory2Modal}><IoMdAdd /> Add Sub Category2 </MenuItem>
                {category2List && category2List.length > 0 ? (
                  category2List.map((category2) => (
                    <MenuItem key={category2.category2id} value={category2.category2id} onClick={() => { fetchCategory3List(category2.category2id) }}>{category2.category2name}</MenuItem>
                  ))) : (
                  <MenuItem disabled>No Sub Category2 available</MenuItem>
                )
                }
              </Select>
            </FormControl>
          </Grid>

          {/* Sub Category3 */}
          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Sub Category3 <span><em>*</em></span></InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name='subCategory3'
                label="Sub Category3"
                value={formData.subCategory3}
                onChange={handleChange}
                required
              >
                <MenuItem onClick={handleAddCategory3Modal}><IoMdAdd /> Add Sub Category3 </MenuItem>
                {category3List && category3List.length > 0 ? (
                  category3List.map((category3) => (
                    <MenuItem key={category3.category3id} value={category3.category3id} onClick={() => { fetchCategory4List(category3.category3id) }}>{category3.category3name}</MenuItem>
                  ))) : (
                  <MenuItem disabled>No Sub Category3 available</MenuItem>
                )
                }
              </Select>
            </FormControl>
          </Grid>

          {/* Sub Category4 */}
          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Sub Category4</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name='subCategory4'
                label="Sub Category4"
                value={formData.subCategory4}
                onChange={handleChange}
              >
                <MenuItem onClick={handleAddCategory4Modal}><IoMdAdd /> Add Sub Category4 </MenuItem>
                {category4List && category4List.length > 0 ? (
                  category4List.map((category4) => (
                    <MenuItem key={category4.category4id} value={category4.category4id} onClick={() => { fetchCategory5List(category4.category4id) }}>{category4.category4name}</MenuItem>
                  ))) : (
                  <MenuItem disabled>No Sub Category4 available</MenuItem>
                )
                }
              </Select>
            </FormControl>
          </Grid>

          {/* Sub Category5 */}
          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Sub Category5</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name='subCategory5'
                label="Sub Category5"
                value={formData.subCategory5}
                onChange={handleChange}
              >
                <MenuItem onClick={handleAddCategory5Modal}><IoMdAdd /> Add Sub Category5 </MenuItem>
                {category5List && category5List.length > 0 ? (
                  category5List.map((category5) => (
                    <MenuItem key={category5.category5id} value={category5.category5id}>{category5.category5name}</MenuItem>
                  ))) : (
                  <MenuItem disabled>No Sub Category5 available</MenuItem>
                )
                }
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={2}>
            <FormControl>
              <TextField className='textfeild'
                fullWidth
                label="Price"
                type='number'
                name='price'
                value={formData.price}
                onChange={handleChange}
                variant="outlined"
                required
              />
            </FormControl>
          </Grid>

          <Grid item xs={2}>
            <FormControl>
              <TextField className='textfeild'
                fullWidth
                label="Discount %"
                type='number'
                name='discount'
                value={formData.discount}
                onChange={handleChange}
                variant="outlined"
              />
            </FormControl>
          </Grid>

          <Grid item xs={2}>
            <FormControl>
              <TextField className='textfeild'
                fullWidth
                label="Stoct Qty"
                type='number'
                name='stockQty'
                value={formData.stockQty}
                onChange={handleChange}
                variant="outlined"
                required
              />
            </FormControl>
          </Grid>

          <Grid item xs={2}>
            <FormControl>
              <TextField className='textfeild'
                fullWidth
                label="Min Stock Qty"
                type='number'
                name='minimumStockQty'
                value={formData.minimumStockQty}
                onChange={handleChange}
                variant="outlined"
                required
              />
            </FormControl>
          </Grid>

          <Grid item xs={2}>
            <FormControl>
              <TextField className='textfeild'
                fullWidth
                label="Max Stock Qty"
                type='number'
                name='maximumStockQty'
                value={formData.maximumStockQty}
                onChange={handleChange}
                variant="outlined"
                required
              />
            </FormControl>
          </Grid>

          {/* Size */}
          <Grid item xs={2}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Size<span><em>*</em></span></InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name='size'
                label="Size"
                value={formData.size}
                onChange={handleChange}
                required
              >
                <MenuItem value={1}>XS</MenuItem>
                <MenuItem value={2}>S</MenuItem>
                <MenuItem value={3}>M</MenuItem>
                <MenuItem value={4}>L</MenuItem>
                <MenuItem value={5}>XL</MenuItem>
                <MenuItem value={6}>XXL</MenuItem>
                <MenuItem value={7}>XXXL</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Colour */}
          <Grid item xs={2}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Color<span><em>*</em></span></InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name='color'
                label="Color"
                value={formData.color}
                onChange={handleChange}
                required
              >
                <MenuItem value={1}>Black</MenuItem>
                <MenuItem value={2}>Red</MenuItem>
                <MenuItem value={3}>Blue</MenuItem>
                <MenuItem value={4}>Pink</MenuItem>
                <MenuItem value={5}>White</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={2}>
            <FormControl>
              <TextField className='textfeild'
                fullWidth
                label="Weight"
                name='weight'
                value={formData.weight}
                onChange={handleChange}
                variant="outlined"

              />
            </FormControl>
          </Grid>

          <Grid item xs={2}>
            <FormControl>
              <TextField className='textfeild'
                fullWidth
                label="Shipping Cost"
                type='number'
                name='shippingCost'
                value={formData.shippingCost}
                onChange={handleChange}
                variant="outlined"

              />
            </FormControl>
          </Grid>

          {/* Distributor List */}
          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Distributo Name<span><em>*</em></span></InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name='distributorId'
                label="Distributor Name"
                value={formData.distributorId}
                onChange={handleChange}
                required
              >
                <MenuItem value={1}>SS Products</MenuItem>
                <MenuItem value={2}>MM Products</MenuItem>
                <MenuItem value={3}>RR Products</MenuItem>
                <MenuItem value={4}>A1 Products</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={2}>
            <FormControl fullWidth>
              <FormControlLabel
                label="isActive"
                control={<Switch checked={formData.isActive}
                  onChange={(e) => handleChange(e)} />}
                labelPlacement="start"

                name='isActive'

                required
              />
            </FormControl>
          </Grid>

          <Grid item xs={4}>
            <TextareaAutosize
              aria-label="minimum height"
              name='description'
              value={formData.description}
              onChange={handleChange}
              placeholder='Enter the product description'
              required />
          </Grid>
          <Grid item xs={12} className='rightAlign'>

          </Grid>
          <Grid item xs={6} className='rightAlign'>
            <DSButton type='button' text="Product List" className='cust-btn' onClick={productList}></DSButton>
            {/* <Button type='button' variant="contained" onClick={productList}>Product List</Button> */}
          </Grid>
          <Grid item xs={6} className='rightAlign'>
            <DSButton type='submit' text='Submit'></DSButton>
          </Grid>

        </Grid>
      </Form>

      {/* Add new brand modal */}

      {
        isOpenAddBrand &&
        <div className='modal-container'>
          <Form className='promod'>
            <Card className='modalStyle'>
              <div>
                <CardHeader title="Add New Brand" />
              </div>
              <FormControl fullWidth className='input-modal'>
                <TextField className='textfeild'
                  fullWidth
                  label="Brand Name"
                  type='text'
                  name='brandname'
                  value={addNewBrand}
                  onChange={(e) => handleChangeNewBrand(e.target.value)}
                  variant="outlined"
                  required
                />
              </FormControl>
              <div>
                <Button type='button' className='butn-modal' variant="contained" onClick={handleCloseAddBrandModal}>Cancel</Button>
                <Button type='button' className='butn-modal' variant="contained" onClick={handleAddBrandSubmit}>Add</Button>
              </div>
            </Card>
          </Form>
          {/* </div> */}

        </div>

      }
      {/* Add new main Category */}
      {
        isOpenAddCategory &&

        <div className='modal-container'>
          <Form className='promod'>
            <Card className='modalStyle'>
              <div>
                <CardHeader title="Add Main Category" />
              </div>
              <div>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Brand Name <span>*</span></InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name='brandId'
                    label="Brand Name"
                    value={formData.brandId}
                    onChange={handleChange}
                    required
                  >
                    {brandList.map((brand) => (
                      <MenuItem key={brand.brandId} value={brand.brandId}>{brand.brandName}</MenuItem>
                    ))

                    }

                  </Select>
                </FormControl>
              </div>
              <div className='input-modal'>
                <FormControl fullWidth >
                  <TextField className='textfeild'
                    fullWidth
                    label="Main Category"
                    type='text'
                    name='maincategory'
                    value={formData.mainCategory}
                    onChange={(e) => handleChangeAddMainCategory(e.target.value)}
                    variant="outlined"
                    required
                  />
                </FormControl>
              </div>
              <div>
                <Button type='button' className='butn-modal' variant="contained" onClick={handleCloseCategoryModal}>Cancel</Button>
                <Button type='button' className='butn-modal' variant="contained" onClick={() => handleAddMCSubmit()}>Add</Button>
              </div>
            </Card>
          </Form>
        </div>
      }
      {/* Add new Category1 */}
      {
        isOpenAddCategory1 &&

        <div className='modal-container'>
          <Form className='promod'>
            <Card className='modalStyle'>
              <div>
                <CardHeader title="Add Category1" />
              </div>
              <div>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Brand Name <span><em>*</em></span></InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name='brandId'
                    label="Brand Name"
                    value={formData.brandId}
                    onChange={handleChange}
                    required
                  >
                    {brandList.map((brand) => (
                      <MenuItem key={brand.brandId} value={brand.brandId}>{brand.brandName}</MenuItem>
                    ))

                    }

                  </Select>
                </FormControl>
              </div>
              <div className='input-modal'>

                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Main Category<span><em>*</em></span></InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name='mainCategory'
                    label="Main Category"
                    value={formData.mainCategory}
                    onChange={handleChange}
                    required
                  >
                    {
                      mainCategoryList.map((maincategory) => (
                        <MenuItem key={maincategory.maincategoryid} value={maincategory.maincategoryid}>{maincategory.maincategoryname}</MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>

              </div>
              <div className='input-modal'>
                <FormControl fullWidth >
                  <TextField className='textfeild'
                    fullWidth
                    label="Sub Category1"
                    type='text'
                    name='category1'
                    value={addCategory1}
                    onChange={(e) => handleChangeAddCategory1(e.target.value)}
                    variant="outlined"
                    required
                  />
                </FormControl>
              </div>
              <div>
                <Button type='button' className='butn-modal' variant="contained" onClick={handleCloseCategory1Modal}>Cancel</Button>
                <Button type='button' className='butn-modal' variant="contained" onClick={() => handleAddCategory1Submit()}>Add</Button>
              </div>
            </Card>
          </Form>
        </div>
      }
      {/* Add new Category2 */}
      {
        isOpenAddCategory2 &&

        <div className='modal-container'>
          <Form className='promod'>
            <Card className='modalStyle'>
              <div>
                <CardHeader title="Add Category2" />
              </div>
              <div>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Brand Name <span><em>*</em></span></InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name='brandId'
                    label="Brand Name"
                    value={formData.brandId}
                    onChange={handleChange}
                    required
                  >
                    {brandList.map((brand) => (
                      <MenuItem key={brand.brandId} value={brand.brandId}>{brand.brandName}</MenuItem>
                    ))

                    }

                  </Select>
                </FormControl>
              </div>
              <div className='input-modal'>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Main Category<span><em>*</em></span></InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name='mainCategory'
                    label="Main Category"
                    value={formData.mainCategory}
                    onChange={handleChange}
                    required
                  >
                    {
                      mainCategoryList.map((maincategory) => (
                        <MenuItem key={maincategory.maincategoryid} value={maincategory.maincategoryid}>{maincategory.maincategoryname}</MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
              </div>
              <div>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Sub Category1 <span>*</span></InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name='subCategory1'
                    label="Sub Category1"
                    value={formData.subCategory1}
                    onChange={handleChange}
                    required
                  >
                    {category1List.map((category1) => (
                      <MenuItem key={category1.category1id} value={category1.category1id}>{category1.category1name}</MenuItem>
                    ))
                    }
                  </Select>
                </FormControl>

              </div>
              <div className='input-modal'>
                <FormControl fullWidth >
                  <TextField className='textfeild'
                    fullWidth
                    label="Sub Category2"
                    type='text'
                    name='category2'
                    value={addCategory2}
                    onChange={(e) => handleChangeAddCategory2(e.target.value)}
                    variant="outlined"
                    required
                  />
                </FormControl>
              </div>
              <div>
                <Button type='button' className='butn-modal' variant="contained" onClick={handleCloseCategory2Modal}>Cancel</Button>
                <Button type='button' className='butn-modal' variant="contained" onClick={() => handleAddCategory2Submit()}>Add</Button>
              </div>
            </Card>
          </Form>
        </div>
      }
      {/* Add new Category3 */}
      {
        isOpenAddCategory3 &&

        <div className='modal-container'>
          <Form className='promod'>
            <Card className='modalStyle'>
              <div>
                <CardHeader title="Add Category3" />
              </div>
              <div>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Brand Name <span><em>*</em></span></InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name='brandId'
                    label="Brand Name"
                    value={formData.brandId}
                    onChange={handleChange}
                    required
                  >
                    {brandList.map((brand) => (
                      <MenuItem key={brand.brandId} value={brand.brandId}>{brand.brandName}</MenuItem>
                    ))
                    }
                  </Select>
                </FormControl>
              </div>
              <div className='input-modal'>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Main Category<span><em>*</em></span></InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name='mainCategory'
                    label="Main Category"
                    value={formData.mainCategory}
                    onChange={handleChange}
                    required
                  >
                    {
                      mainCategoryList.map((maincategory) => (
                        <MenuItem key={maincategory.maincategoryid} value={maincategory.maincategoryid}>{maincategory.maincategoryname}</MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
              </div>
              <div className='input-modal'>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Sub Category1 <span>*</span></InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name='subCategory1'
                    label="Sub Category1"
                    value={formData.subCategory1}
                    onChange={handleChange}
                    required
                  >
                    {category1List.map((category1) => (
                      <MenuItem key={category1.category1id} value={category1.category1id}>{category1.category1name}</MenuItem>
                    ))
                    }
                  </Select>
                </FormControl>
              </div>
              <div>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Sub Category2 <span><em>*</em></span></InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name='subCategory2'
                    label="Sub Category2"
                    value={formData.subCategory2}
                    onChange={handleChange}
                    required
                  >
                    {category2List.map((category2) => (
                      <MenuItem key={category2.category2id} value={category2.category2id} >{category2.category2name}</MenuItem>
                    ))
                    }
                  </Select>
                </FormControl>
              </div>
              <div className='input-modal'>
                <FormControl fullWidth >
                  <TextField className='textfeild'
                    fullWidth
                    label="Sub Category3"
                    type='text'
                    name='category3'
                    value={addCategory3}
                    onChange={(e) => handleChangeAddCategory3(e.target.value)}
                    variant="outlined"
                    required
                  />
                </FormControl>
              </div>
              <div>
                <Button type='button' className='butn-modal' variant="contained" onClick={handleCloseCategory3Modal}>Cancel</Button>
                <Button type='button' className='butn-modal' variant="contained" onClick={() => handleAddCategory3Submit()}>Add</Button>
              </div>
            </Card>
          </Form>
        </div>
      }
      {/* Add new Category4 */}
      {
        isOpenAddCategory4 &&

        <div className='modal-container'>
          <Form className='promod'>
            <Card className='modalStyle'>
              <div>
                <CardHeader title="Add Category3" />
              </div>
              <div>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Brand Name <span><em>*</em></span></InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name='brandId'
                    label="Brand Name"
                    value={formData.brandId}
                    onChange={handleChange}
                    required
                  >
                    {brandList.map((brand) => (
                      <MenuItem key={brand.brandId} value={brand.brandId}>{brand.brandName}</MenuItem>
                    ))
                    }
                  </Select>
                </FormControl>
              </div>
              <div className='input-modal'>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Main Category<span><em>*</em></span></InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name='mainCategory'
                    label="Main Category"
                    value={formData.mainCategory}
                    onChange={handleChange}
                    required
                  >
                    {
                      mainCategoryList.map((maincategory) => (
                        <MenuItem key={maincategory.maincategoryid} value={maincategory.maincategoryid}>{maincategory.maincategoryname}</MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
              </div>
              <div>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Sub Category1 <span>*</span></InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name='subCategory1'
                    label="Sub Category1"
                    value={formData.subCategory1}
                    onChange={handleChange}
                    required
                  >
                    {category1List.map((category1) => (
                      <MenuItem key={category1.category1id} value={category1.category1id}>{category1.category1name}</MenuItem>
                    ))
                    }
                  </Select>
                </FormControl>
              </div>
              <div className='input-modal'>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Sub Category2 <span><em>*</em></span></InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name='subCategory2'
                    label="Sub Category2"
                    value={formData.subCategory2}
                    onChange={handleChange}
                    required
                  >
                    {category2List.map((category2) => (
                      <MenuItem key={category2.category2id} value={category2.category2id} >{category2.category2name}</MenuItem>
                    ))
                    }
                  </Select>
                </FormControl>
              </div>
              <div>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Sub Category3 <span><em>*</em></span></InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name='subCategory3'
                    label="Sub Category3"
                    value={formData.subCategory3}
                    onChange={handleChange}
                    required
                  >
                    {category3List.map((category3) => (
                      <MenuItem key={category3.category3id} value={category3.category3id}>{category3.category3name}</MenuItem>
                    ))
                    }
                  </Select>
                </FormControl>
              </div>
              <div className='input-modal'>
                <FormControl fullWidth >
                  <TextField className='textfeild'
                    fullWidth
                    label="Sub Category4"
                    type='text'
                    name='category4'
                    value={addCategory4}
                    onChange={(e) => handleChangeAddCategory4(e.target.value)}
                    variant="outlined"
                    required
                  />
                </FormControl>
              </div>
              <div>
                <Button type='button' className='butn-modal' variant="contained" onClick={handleCloseCategory4Modal}>Cancel</Button>
                <Button type='button' className='butn-modal' variant="contained" onClick={() => handleAddCategory4Submit()}>Add</Button>
              </div>
            </Card>
          </Form>
        </div>
      }
      {/* Add new Category5 */}
      {
        isOpenAddCategory5 &&

        <div className='modal-container'>
          <Form className='promod'>
            <Card className='modalStyle'>
              <div>
                <CardHeader title="Add Category5" />
              </div>
              <div>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Brand Name <span><em>*</em></span></InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name='brandId'
                    label="Brand Name"
                    value={formData.brandId}
                    onChange={handleChange}
                    required
                  >
                    {brandList.map((brand) => (
                      <MenuItem key={brand.brandId} value={brand.brandId}>{brand.brandName}</MenuItem>
                    ))
                    }
                  </Select>
                </FormControl>
              </div>
              <div className='input-modal'>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Main Category<span><em>*</em></span></InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name='mainCategory'
                    label="Main Category"
                    value={formData.mainCategory}
                    onChange={handleChange}
                    required
                  >
                    {
                      mainCategoryList.map((maincategory) => (
                        <MenuItem key={maincategory.maincategoryid} value={maincategory.maincategoryid}>{maincategory.maincategoryname}</MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
              </div>
              <div className='input-modal'>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Sub Category1 <span>*</span></InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name='subCategory1'
                    label="Sub Category1"
                    value={formData.subCategory1}
                    onChange={handleChange}
                    required
                  >
                    {category1List.map((category1) => (
                      <MenuItem key={category1.category1id} value={category1.category1id}>{category1.category1name}</MenuItem>
                    ))
                    }
                  </Select>
                </FormControl>
              </div>
              <div>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Sub Category2 <span><em>*</em></span></InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name='subCategory2'
                    label="Sub Category2"
                    value={formData.subCategory2}
                    onChange={handleChange}
                    required
                  >
                    {category2List.map((category2) => (
                      <MenuItem key={category2.category2id} value={category2.category2id} >{category2.category2name}</MenuItem>
                    ))
                    }
                  </Select>
                </FormControl>
              </div>
              <div className='input-modal'>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Sub Category3 <span><em>*</em></span></InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name='subCategory3'
                    label="Sub Category3"
                    value={formData.subCategory3}
                    onChange={handleChange}
                    required
                  >
                    {category3List.map((category3) => (
                      <MenuItem key={category3.category3id} value={category3.category3id}>{category3.category3name}</MenuItem>
                    ))
                    }
                  </Select>
                </FormControl>
              </div>
              <div>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Sub Category4</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name='subCategory4'
                    label="Sub Category4"
                    value={formData.subCategory4}
                    onChange={handleChange}
                  >
                    {category4List.map((category4) => (
                      <MenuItem key={category4.category4id} value={category4.category4id} >{category4.category4name}</MenuItem>
                    ))
                    }
                  </Select>
                </FormControl>

              </div>
              <div className='input-modal'>
                <FormControl fullWidth >
                  <TextField className='textfeild'
                    fullWidth
                    label="Sub Category5"
                    type='text'
                    name='category5'
                    value={addCategory5}
                    onChange={(e) => handleChangeAddCategory5(e.target.value)}
                    variant="outlined"
                    required
                  />
                </FormControl>
              </div>
              <div>
                <Button type='button' className='butn-modal' variant="contained" onClick={handleCloseCategory5Modal}>Cancel</Button>
                <Button type='button' className='butn-modal' variant="contained" onClick={() => handleAddCategory5Submit()}>Add</Button>
              </div>
            </Card>
          </Form>
        </div>
      }

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

export default AddNewProducts;
