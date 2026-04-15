import React, { useEffect, useState } from 'react'
import { apiService } from '../../../service/Service';
import { jwtDecode } from 'jwt-decode';
import DSTableContainer from '../../../components/ds-table-container/DSTableContainer';
import DSSnackbar from '../../../components/ds-snackbar/DSSnackbar';
import { useNavigate } from 'react-router-dom';
import DSButton from '../../../components/ds-button/DSButton';
import './viewDomain.css';

const ViewDomain = () => {
  const navigate = useNavigate();
  const url = process.env.REACT_APP_API_BASE_URL;
  const [variant, setVariant] = useState();
  const [snackBarMsg, setSnackBarMsg] = useState();
  const [isSnackBar, setIsSnackBar] = useState();
  const [columns, setColumns] = useState([]);
  const [formData, setFormData] = useState([]);

  const domainList = () => {
    const domainListUrl = (`${url}/domain/view-domain`);
    try {
      apiService.get(domainListUrl)
        .then((response) => {
          const status = response.status;
          if (status === 200) {
            const token = response.data.token;
            const decodeToken = jwtDecode(token);
            const data = decodeToken.domainList;
            const updateFormData = data.map((item) => ({
              id: item.domainId,
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
              setColumns(newColummn)
            }
            setFormData(updateFormData)
          }

        })

    } catch (error) {
      setSnackBarMsg(error.response.data.message);
      setVariant('error');
      setIsSnackBar(true);
    }
  }
  useEffect(() => {
  }, [columns, formData])
  useEffect(() => {
    domainList();
  }, []);

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
    navigate('/add-domain')
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
      <DSTableContainer columns={columns} data={formData} rowsPerPageOptions={[5, 10, 25]} action={false} title='Domain List' onSwitchChange={handleSwitchChange} onActionClick={handleActionClick}></DSTableContainer>

    </div>
  )
}

export default ViewDomain
