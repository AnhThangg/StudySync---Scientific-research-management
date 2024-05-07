import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import "./ComboBox.scss"

export default function ComboBox() {
    return (
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={faculty}
            sx={{ width: 300, marginRight:'30px' }}
            renderInput={(params) => <TextField {...params} label="Faculty" />}
        />
    );
}

const faculty = [
    { label: 'Khoa CNPM' },
    { label: 'Khoa Cơ Khí' },
    { label: 'Khoa Du Lịch' },
    { label: 'Khoa Ngân Hàng' },
    { label: 'Khoa Tiếng Trung' },
    { label: 'Khoa IT' },
];