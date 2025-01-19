import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { apiService } from '../../../service/Service';
import { jwtDecode } from 'jwt-decode';
import './ProductList.css'

const ProductList = () => {

    const url = process.env.REACT_APP_API_BASE_URL;
    const [formData, setFormData] = useState([])
    const isFetched = useRef(false);

    
    useEffect(() => {
        const fetchProducts = async () => {
            if (isFetched.current) return;
            try {
                const productListUrl = `${url}/product/product-list`;
                const response = await apiService.get(productListUrl);
                const status = response.status;
                if (status === 200 || status === 201) {
                    const token = response.data.Token;
                    const decodeToken = jwtDecode(token);
                    setFormData(decodeToken.products)
                }
            } catch (error) {
                console.error('Error fetching product list:', error.message);
            }
        }
        fetchProducts();
    }, []);

    useEffect(() => {
       
    }, [formData]);
    const handleUpdate = () => {
        alert("Test")
    }




    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell className='tabcell'>Product Name</TableCell>
                        <TableCell className='tabcell'>Brand Name</TableCell>
                        <TableCell className='tabcell'>Main Category</TableCell>
                        <TableCell className='tabcell'>SubCategory1</TableCell>
                        <TableCell className='tabcell'>SubCategory2</TableCell>
                        <TableCell className='tabcell'>SubCategory3</TableCell>
                        <TableCell className='tabcell'>SubCategory4</TableCell>
                        <TableCell className='tabcell'>SubCategory5</TableCell>
                        <TableCell className='tabcell'>Price</TableCell>
                        <TableCell className='tabcell'>Discount %</TableCell>
                        <TableCell className='tabcell'>Stock Qty</TableCell>
                        <TableCell className='tabcell'>Min Stk Qty</TableCell>
                        <TableCell className='tabcell'>Max Stk Qty</TableCell>
                        <TableCell className='tabcell'>Size</TableCell>
                        <TableCell className='tabcell'>Color</TableCell>
                        <TableCell className='tabcell'>Weight</TableCell>
                        <TableCell className='tabcell'>Shipping Cost</TableCell>
                        <TableCell className='tabcell'>Distributer</TableCell>
                        {/* <TableCell>isActive</TableCell>
                        <TableCell>Image</TableCell> */}
                        <TableCell>Update</TableCell>

                    </TableRow>
                </TableHead>

                <TableBody>
                    {formData.map((product) => (
                        <TableRow key={product.productId}>
                            <TableCell className='tabcell'>{product.productName}</TableCell>
                            <TableCell className='tabcell'>{product.brandId}</TableCell>
                            <TableCell className='tabcell'>{product.mainCategory}</TableCell>
                            <TableCell className='tabcell'>{product.subCategory1}</TableCell>
                            <TableCell className='tabcell'>{product.subCategory2}</TableCell>
                            <TableCell className='tabcell'>{product.subCategory3}</TableCell>
                            <TableCell className='tabcell'>{product.subCategory4}</TableCell>
                            <TableCell className='tabcell'>{product.subCategory5}</TableCell>
                            <TableCell className='tabcell'>{product.price}</TableCell>
                            <TableCell className='tabcell'>{product.discount}</TableCell>
                            <TableCell className='tabcell'>{product.stockQty}</TableCell>
                            <TableCell className='tabcell'>{product.minimumStockQty}</TableCell>
                            <TableCell className='tabcell'>{product.maximumStockQty}</TableCell>
                            <TableCell className='tabcell'>{product.size}</TableCell>
                            <TableCell className='tabcell'>{product.color}</TableCell>
                            <TableCell className='tabcell'>{product.weight}</TableCell>
                            <TableCell className='tabcell'>{product.shippingCost}</TableCell>
                            <TableCell className='tabcell'>{product.distributorId}</TableCell>
                            {/* <TableCell>{ }</TableCell>
                    <TableCell>{ }</TableCell> */}

                            <TableCell>
                                {product.productId && (
                                    <Button onClick={() => handleUpdate(product.productId)}>Update</Button>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>

            </Table>
        </TableContainer>
    )
}

export default ProductList