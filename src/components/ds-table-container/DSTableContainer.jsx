import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material'
import React, { useState } from 'react'
import './DSTableContainer.css';

const DSTableContainer = ({ columns, data, rowsPerPageOptions, classname,title}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

// Handle Rows Per Page
const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
}
    return (
        <div className='DSTableContainer'>
            <Typography className='fw-bold'>{title}</Typography>
        <Paper>            
            <TableContainer className='custom-table-container'>
                <Table>
                    <TableHead>
                        <TableRow>
                        <TableCell>S.No</TableCell>
                            {
                                columns.map((column) => (
                                    <TableCell key={column.id} align={column.align || "left"} className={`fw-bold ${classname}`} >
                                        {column.label}
                                    </TableCell>
                                ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                            <TableRow key={index} >
                                 <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                                {columns.map((column,colIndex) => (
                                    <TableCell key={colIndex} >
                                        {row[column.label] ? row[column.label] : "-"} 
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>
            </TableContainer>

            {/* Pagenation */}
            { data.length > 0 ? (
            <TablePagination 
              rowsPerPageOptions={rowsPerPageOptions}
              component="div"
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={(event,newPage) =>setPage(newPage)}
              onRowsPerPageChange={(event) =>handleChangeRowsPerPage(event)}>

            </TablePagination>
            ):(
                <p>No data available!</p>
            )}


        </Paper>
        </div>
    );
};

export default DSTableContainer
