import React from 'react';
import './DSPopover.css';
import { Box, Popover } from '@mui/material';

const DSPopover = ({ anchorEl, open, onClose, children }) => {
    return (
        <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={onClose}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "center"
            }}
            transformOrigin={{
                vertical: "top",
                horizontal: "center"
            }}
        >
            <Box className='DSbox' p={2}>
                {children}
            </Box>
        </Popover>
    )
}

export default DSPopover
