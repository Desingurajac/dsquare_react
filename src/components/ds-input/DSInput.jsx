import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React from 'react'
import { IoMdAdd } from 'react-icons/io'

const DSInput = ({ label, type, className, name, value, onChange, options, select, addlabel, addoption, onselect, onClick, required }) => {

    return (
        <FormControl fullWidth>
            {select ? (
                <>
                    <InputLabel>{label}</InputLabel>
                    <Select value={value}
                        onChange={onChange}
                        label={label}
                        name={name}
                        required={required}>
                        {addoption && (
                            <MenuItem onClick={onClick}><IoMdAdd /> {addlabel} </MenuItem>
                        )}
                        {options && options.length > 0 ? (
                            options.map((option, index) => (
                                <MenuItem key={index}
                                    value={option.value}
                                    onClick={() => onselect && onselect(option.value)}>
                                    {option.label}
                                </MenuItem>
                            ))) : (
                            <MenuItem disabled>No data available</MenuItem>
                        )}
                    </Select>
                </>
            ) : (
                <>
                    <TextField
                        label={label}
                        className={`textfeild ${className}`}
                        type={type}
                        name={name}
                        value={value}
                        onChange={onChange}
                        fullWidth
                        variant='outlined'
                        required={required}
                    />
                </>
            )}

        </FormControl>

    )
}

export default DSInput
