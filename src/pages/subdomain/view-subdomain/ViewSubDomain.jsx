import React, { useEffect, useState } from 'react'
import DSSnackbar from '../../../components/ds-snackbar/DSSnackbar';
import DSButton from '../../../components/ds-button/DSButton';
import DSTableContainer from '../../../components/ds-table-container/DSTableContainer';
import { apiService } from '../../../service/Service';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const ViewSubDomain = () => {
  const navigate = useNavigate();
  const url = process.env.REACT_APP_API_BASE_URL;
  const [variant, setVariant] = useState();
  const [snackBarMsg, setSnackBarMsg] = useState();
  const [isSnackBar, setIsSnackBar] = useState();
  const [columns, setColumns] = useState([]);
  const [formData, setFormData] = useState([]);


  const subDomainList = () => {
    try{
      const subDomainListUrl = (`${url}/domain/view-subdomain`);
      apiService.get(subDomainListUrl)
      .then((response)=>{
        const status = response.status;
        if(status === 200){
          const token = response.data.token;
          const decodeToken = jwtDecode(token);
          console.log(decodeToken);
          const data = decodeToken.subdomainList;
          const updateFormData = data.map((item) => ({
            id: item.subdomainId,
            SubdomainName:item.subdomainName,
            DomainName: item.domainName,
            CountryName: item.countryName,
            Description: item.description,
            isActive: item.isActive ? "Active" : "Inactive",
          }));
          if (data.length > 0) {
            const newColummn = Object.keys(updateFormData[0]).filter((key) => key !== "id").map((value, index) => ({
              id: value,
              label: value
            }));
            setColumns(newColummn);
            setFormData(updateFormData);
          }
        }
      })
    }catch(error){

    }
  }

   useEffect(() => {
    }, [columns, formData])
    useEffect(() => {
      subDomainList();
    }, [subDomainList]);

  const handleActionClick = (row) => {
    alert(`Updating: ${row.domainName}`);
  };

  const handleSwitchChange = (row, column) => {
    setFormData((prevData) =>
      prevData.map((item) =>
        item.domainId === row.domainId ? { ...item, [column]: !item[column] } : item
      )
    );
  };

  const handleNavigate = () => {
    navigate('/view-subdomain')
  }
  return (

    <div className='frmpad'>
      {
        isSnackBar &&
        <DSSnackbar
          open={isSnackBar}
          message={snackBarMsg}
          variant={variant}
          onClose={() => setIsSnackBar(false)}
        />
      }
      <div className='align-btn'>
        <DSButton
          type='button'
          text='Add'
          className='fw-bold view-btn'
          onClick={handleNavigate}
        ></DSButton>
      </div>
      <DSTableContainer columns={columns} data={formData} rowsPerPageOptions={[5, 10, 25]} action={false} title='Sub Domain List' onSwitchChange={handleSwitchChange} onActionClick={handleActionClick}></DSTableContainer>
    </div>
  )
}

export default ViewSubDomain
