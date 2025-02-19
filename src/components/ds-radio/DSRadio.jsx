import { Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import React from 'react'

const DSRadio = ({label,onchange,option}) => {
  return (
   <FormControl>
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
    <FormLabel>{label}</FormLabel>
    <RadioGroup row onChange={onchange}>
      {option.map((option , index) => (
        <FormControlLabel 
         key={index}
         value={option.value}
         control={<Radio sx={{color:option.color ,"&.Mui-checked" : {color:option.color}}} />}
        label={option.label}
        />
      ))}

    </RadioGroup>
    </Box>
   </FormControl>
  )
}

export default DSRadio
