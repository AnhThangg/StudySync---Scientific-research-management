import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import "./ComboBox.scss"

export default function ComboBox2() {
    return (
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={faculty}
            sx={{ width: 300, marginRight:'30px' }}
            renderInput={(params) => <TextField {...params} label="Project Code" />}
        />
    );
}

const faculty = [
    { label: 'PJ01SA' },
    { label: 'PJ03YA' },
    { label: 'PJ33NV' },
    { label: 'PJ91UV' },
    { label: 'PJ01SA' },
    { label: 'PJ42CV' },
];