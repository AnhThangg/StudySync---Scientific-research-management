import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const StyledButton = styled(Button)(({ theme }) => ({
    marginTop: '20px',
    background: '#F6E8E8',
    border: 'solid 1px #707070',
    color: '#707070',
    '&:hover': {
        background: '#D82C2C',
        color: '#fff',
    },
}));

export default function FileUpLoad() {
    return (
        <StyledButton
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
        >
            Upload file
            <VisuallyHiddenInput type="file" />
        </StyledButton>
    );
}
