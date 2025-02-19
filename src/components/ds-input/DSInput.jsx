
import { FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useState } from 'react'
import { IoMdAdd } from 'react-icons/io'
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import './DSInput.css';

const DSInput = ({ label, type, className, name, value, onChange, options, select, addlabel, addoption, onselect, onClick, icon, required,onblur }) => {

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => { setShowPassword((prev) => !prev) }
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
                        className={`textfield ${className}`}
                        type={type === 'password' ? (showPassword ? 'text' : 'password') : type}   //Toggle Password Visiblity
                        name={name}
                        value={value}
                        onChange={onChange}
                        fullWidth
                        variant='outlined'
                        required={required}
                        onBlur={onblur}
                        autoComplete='off'
                        InputLabelProps={{
                            shrink: type === "date" ? true : undefined, 
                          }}
                        //  placeholder={type === "date" ? "mm/dd/yyyy" : ""} 
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position='end'>
                                    {type === 'password' ? (
                                        showPassword ?
                                            <MdVisibilityOff className='iconvis' onClick={handleClickShowPassword} /> : <MdVisibility className='iconvis' onClick={handleClickShowPassword} />
                                    ) : (
                                        icon && <span>{icon}</span>
                                    )}
                                </InputAdornment>
                            ),
                        }}
                    />
                </>
            )}

        </FormControl>

    )
}

export default DSInput
