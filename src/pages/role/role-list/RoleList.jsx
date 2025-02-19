import React, { useEffect, useState } from 'react'
import { apiService } from '../../../service/Service';
import { jwtDecode } from 'jwt-decode';
import DSTableContainer from '../../../components/ds-table-container/DSTableContainer';

const RoleList = () => {
    const url = process.env.REACT_APP_API_BASE_URL;
    const userid = localStorage.getItem('userId')
    const [columns, setColumns] = useState([]);
    const [formData, setFormData] = useState([]);
    const roleList = () => {
        const roleListUrl = (`${url}/role/role-list`);
        const userId = { userid: userid };
        try {
            apiService.get(roleListUrl, userId)
                .then((response) => {
                    const status = response.status;
                    if (status === 200 || status === 201) {
                        const token = response.data.token;
                        const decodeToken = jwtDecode(token);
                        console.log(decodeToken)
                        const data = decodeToken.data;
                        const updateFormData = data.map((item, index) => ({
                            RoleName: item.roleName,
                            Description: item.description,
                            Active: item.isactive
                        }))

                        if (data.length > 0) {
                            const newColumn = Object.keys(updateFormData[0]).map((value, index) => ({
                                id: value,
                                label: value
                            }));
                            setColumns(newColumn)
                        }
                        setFormData(updateFormData)
                    }
                })
        } catch (error) {

        }
    }
    useEffect(() => {
    }, [columns, formData])
    useEffect(() => {
        roleList();
    }, [])
    return (
        <div className='frmpad'>
            <DSTableContainer columns={columns} data={formData} rowsPerPageOptions={[5, 10, 25]} title='Role List'></DSTableContainer>
        </div>
    )
}

export default RoleList