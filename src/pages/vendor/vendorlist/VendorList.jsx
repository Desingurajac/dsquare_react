import React, { useEffect, useState } from 'react'
import DSTableContainer from '../../../components/ds-table-container/DSTableContainer'
import { Typography } from '@mui/material';
import { apiService } from '../../../service/Service';
import { jwtDecode } from 'jwt-decode';

const VendorList = () => {

  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const [columns, setColumn] = useState([])
  const [formData, setFormData] = useState([])
  const getVendorList = async () => {
    const vendorListUrl = `${baseUrl}/vendor/get-vendor-details`;

    try {
      const vendorDetails = await apiService.get(vendorListUrl)
        .then((response) => {
          const status = response.status;
          if (status === 200 || status === 201) {
            const token = response.data.token;
            const decodeToken = jwtDecode(token);
            const data = decodeToken.data;
            const newFormData = data.map((item, index) => ({
              VendorName: item.vendorname,
              CreditTerm: item.creditterm,
              LeadTerm: item.leadtime,
              Address1: item.address1,
              Address2: item.address2,
              Country: item.countryname,
              State: item.statename,
              City: item.cityname,
              ZipCode: item.zipcode,
              Mobile: item.mobileno,
              Contact: item.contactno,
              Email: item.emailid
            }))
            if (data.length > 0) {
              const newColumn = Object.keys(newFormData[0]).map((value, index) => ({
                id: value,
                label: value
              }));
              setColumn(newColumn);
            }
            setFormData(newFormData);

          }
        })
    } catch (error) {

    }
  }
  useEffect(() => {
  }, [columns, formData])
  useEffect(() => {
    getVendorList();

  }, []);

  return (
    <div className='frmpad'>

      <DSTableContainer columns={columns} data={formData} rowsPerPageOptions={[5, 10, 25]} title='Vendor List'> </DSTableContainer>

    </div>
  )
}

export default VendorList
