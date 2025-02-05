import { TextareaAutosize } from '@mui/material'
import React from 'react'

export const DSTextArea = ({name, value, onChange, placeholder, minrows,required}) => {
  return (
    <TextareaAutosize 
     aria-label={placeholder}
     name={name}
     value={value}
     placeholder={placeholder}
     onChange={onChange}
     minRows={minrows}
     required={required}
    />
  )
}
