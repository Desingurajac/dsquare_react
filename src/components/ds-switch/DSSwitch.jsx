import { FormControl, FormControlLabel, Switch } from '@mui/material'
import React from 'react'
import './DSSwitch.css';
const DSSwitch = ({ label,className, name, checked, onChange }) => {
    return (
        <FormControl className='fcwidth' >
            <FormControlLabel
                label={label}
                className={`${className}`}
                control={<Switch checked={checked} onChange={onChange} name={name} />}
                labelPlacement='start'
                           />
        </FormControl>


    )
}

export default DSSwitch
