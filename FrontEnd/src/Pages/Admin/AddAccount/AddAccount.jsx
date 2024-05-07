import * as React from 'react';
import { Outlet, NavLink, useLocation } from "react-router-dom";
import {
  Button,
  Box,
  Typography,
  TextField,
  MenuItem
} from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import { Edit, Delete } from "@mui/icons-material";
import AddAccountFaculty from '../../../Component/AddAccount/AddAccountFaculty';
import AddAccountMentor from '../../../Component/AddAccount/AddAccountMentor';
import AddAccountStudent from '../../../Component/AddAccount/AddAccountStudent';
import AddAccountUniver from '../../../Component/AddAccount/AddAccountUniver';
import { useState } from 'react';

const role = [
  {
    value: 'univer',
    label: 'Univer',
  },
  {
    value: 'faculty',
    label: 'Faculty',
  },
  {
    value: 'mentor',
    label: 'Mentor',
  },
  {
    value: 'student',
    label: 'Student',
  },
];

const AddAccount = () => {

  const [roleSelect, setRoleSelect] = useState('student');
  const handleSelectRole = (e) => {
    setRoleSelect(e.target.value)
  }
  return (
    <Box className="container" sx={{ padding: "50px 0 0 50px" }}>
      <Typography
        variant="h4"
        sx={{
          color: "#D82C2C",
          fontWeight: "bold",
        }}>
        Add Account
      </Typography>

      <Box className="addContainer">
        <TextField
          id="outlined-select-currency"
          select
          size='medium'
          label="Select Role"
          value={roleSelect}
          helperText="Please select your role"
          sx={{ width: '300px', marginTop: '50px' }}
          onChange={handleSelectRole}
        >
          {role.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <Box className="roleComponent" sx={{
          padding: "35px 0 0 50px"
        }}>
          {(roleSelect === 'univer') && <AddAccountUniver />}
          {(roleSelect === 'faculty') && <AddAccountFaculty />}
          {(roleSelect === 'mentor') && <AddAccountMentor />}
          {(roleSelect === 'student') && <AddAccountStudent />}
        </Box>
      </Box>


    </Box>
  )
}

export default AddAccount