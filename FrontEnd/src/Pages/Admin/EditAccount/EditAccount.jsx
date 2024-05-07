import * as React from 'react';
import { Outlet, NavLink, useLocation } from "react-router-dom";
import {
    Button,
    Box,
    Typography,
    TextField,
    MenuItem,
    Input,
    IconButton
} from "@mui/material";
import { Edit, Delete, FileUpload } from "@mui/icons-material";
import { useEffect } from 'react';
import { getAccount } from '../../../api/adminApi';
import { useState } from 'react';
import './EditAccount.scss'
import ava from '../../../assets/Avatar.png'

const EditAccount = () => {
    const sex = [
        {
            value: '1',
            label: 'Male'
        },
        {
            value: '0',
            label: 'Female'
        },
    ];

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        file.preview = URL.createObjectURL(file) // Lấy file đầu tiên từ danh sách các file được chọn
        setSelectedFile(file);
        // Bạn có thể thực hiện các xử lý khác với file ở đây, như gửi file lên server
    };
    return (
        <Box className="container" sx={{ width: '100%', height: '100vh', padding: "50px 0 0 50px" }}>
            <Typography
                variant="h4"
                sx={{
                    color: "#D82C2C",
                    fontWeight: "bold",
                }}>
                Edit Account Student
            </Typography>
            <Box className="formEdit" sx={{
                width: '100%',
                padding: '50px 0 0 50px',
                display: 'flex',
                flexDirection: 'row',

            }}>
                <Box className="formEditLeft" sx={{
                    width: '60%',
                    height: '400px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '30px',
                }}>
                    <Box className="row">
                        <Typography sx={{
                            fontSize: '30px',
                            fontWeight: 'bold',
                            color: '#999',
                        }}>
                            Role:
                        </Typography>
                        <Typography sx={{
                            fontSize: '30px',
                            fontWeight: 'bold',
                            color: '#999',
                        }}>
                            Student
                        </Typography>
                    </Box>
                    <Box className="row">
                        <Typography sx={{
                            fontSize: '30px',
                            fontWeight: 'bold',
                            color: '#999',
                        }}>
                            Code:
                        </Typography>
                        <Typography sx={{
                            fontSize: '30px',
                            fontWeight: 'bold',
                            color: '#999',
                        }}>
                            26211329003
                        </Typography>
                    </Box>
                    <Box className="row">
                        <Typography sx={{
                            fontSize: '30px',
                            fontWeight: 'bold',
                            color: '#999',
                        }}>
                            Username:
                        </Typography>
                        <Typography sx={{
                            fontSize: '30px',
                            fontWeight: 'bold',
                            color: '#999',
                        }}>
                            nguyentanhthang
                        </Typography>
                    </Box>
                    <Box className="row">
                        <Typography sx={{
                            fontSize: '30px',
                            fontWeight: 'bold',
                            color: '#999',
                        }}>
                            Sex:
                        </Typography>
                        <TextField
                            id="outlined-select-currency"
                            select
                            size='small'
                            label="Select Sex"
                            defaultValue="1"
                            InputProps={{
                                style: {
                                    color: '#999',
                                    fontWeight: 'bold',
                                    fontSize: '20px',
                                    borderRadius: '15px'
                                }
                            }}
                            sx={{ width: '120px', borderRadius: '50px' }}
                        >
                            {sex.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Box>
                    <Box className="row">
                        <Typography sx={{
                            fontSize: '30px',
                            fontWeight: 'bold',
                            color: '#999',
                        }}>
                            Date Of Birth:
                        </Typography>
                        <TextField
                            type='date'
                            size='small'
                            label='Select Date'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            InputProps={{
                                style: {
                                    color: '#999',
                                    fontWeight: 'bold',
                                    fontSize: '20px',
                                    borderRadius: '15px'
                                },

                            }}

                        />
                    </Box>
                    <Box className="row">
                        <Typography sx={{
                            fontSize: '30px',
                            fontWeight: 'bold',
                            color: '#999',
                        }}>
                            Email:
                        </Typography>
                        <TextField
                            size='small'
                            type='email'
                            label='Email'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            InputProps={{
                                style: {
                                    color: '#999',
                                    fontWeight: 'bold',
                                    fontSize: '20px',
                                    borderRadius: '15px'
                                },

                            }}
                        />
                    </Box>
                    <Box className="row">
                        <Typography sx={{
                            fontSize: '30px',
                            fontWeight: 'bold',
                            color: '#999',
                        }}>
                            Address:
                        </Typography>
                        <TextField
                            id="outlined-select-currency"
                            select
                            size='small'
                            label="Select Sex"
                            defaultValue="1"
                            InputProps={{ style: { color: '#999', fontWeight: 'bold', fontSize: '20px', borderRadius: '15px' } }}
                            sx={{ width: '120px', borderRadius: '50px' }}
                        >
                            {sex.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Box>
                    <Box className="row">
                        <Typography sx={{
                            fontSize: '30px',
                            fontWeight: 'bold',
                            color: '#999',
                        }}>
                            Phone:
                        </Typography>
                        <TextField
                            size='small'
                            type='number'
                            label='Phone Number'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            InputProps={{
                                style: {
                                    color: '#999',
                                    fontWeight: 'bold',
                                    fontSize: '20px',
                                    borderRadius: '15px'
                                },
                            }}
                        />
                    </Box>

                </Box>
                <Box className="formEditRight" sx={{
                    width: '35%',
                    height: '400px',
                }}>
                    <Box
                        sx={{
                            border: "5px solid #D82C2C",
                            alignItems: "center",
                            width: "155px",
                            height: "147px",
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <label htmlFor="upload-file">
                            <IconButton
                                component="span"
                                aria-label="upload-picture"
                                sx={{
                                    width: "100%",
                                    // height: "100px",
                                }}
                            >
                                <img src={selectedFile ? selectedFile?.preview : ava} width={'100%'} alt="" />
                            </IconButton>
                        </label>
                        <Input
                            id="upload-file"
                            type="file"
                            sx={{ display: "none" }}
                            onChange={handleFileChange}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default EditAccount