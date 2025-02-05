import React from 'react'
import { Button } from '@mui/material'
const DSButton = ({ type,text, onClick, className }) => {
    return (
        <div>
            <Button
                type={type}
                variant='contained'
                className={`button ${className}`}
                onClick={onClick} >
                {text}
            </Button>
        </div>
    )
}

export default DSButton
