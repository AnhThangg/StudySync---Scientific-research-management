import React, { useState, useEffect } from "react";
import {
    Box,
    Button,
    IconButton,
    TextField,
    Typography,
    TextareaAutosize,
    Autocomplete,
    Snackbar,
    Alert,
} from "@mui/material";
import backgroundImage from '../../../assets/Certificate.png'
import { School, AccountTree, Person } from "@mui/icons-material";
import { Outlet, NavLink, useLocation } from "react-router-dom";

const UniverCetificate = () => {
    return (
        <Box sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <Box sx={{
                width: '85%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <Box sx={{
                    width: '100%',
                    height: '120px',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'start',
                    alignItems: 'end'
                }}>
                    <Typography sx={{
                        color: '#D82C2C',
                        fontWeight: 'bold',
                        fontSize: '30px'
                    }}>Certificate</Typography>
                </Box>
                <Box sx={{
                    marginTop: '20px',
                    width: '90%',
                    backgroundImage: `url(${backgroundImage})`,
                    height: '790px',
                    backgroundSize: 'cover',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <Typography sx={{
                        fontSize: '28px',
                        color: '#808184',
                        marginTop: '240px'
                    }}>
                        Faculty of software technology
                    </Typography>
                    <Typography sx={{
                        fontSize: '32px',
                        color: '#333',
                        marginTop: '80px',
                        fontFamily: 'revert-layer',
                        fontWeight: 'bold'
                    }}>
                        StudySync scientific research topics
                    </Typography>
                    <Typography sx={{
                        fontSize: '32px',
                        color: '#333',
                        marginTop: '8px',
                        fontFamily: 'revert-layer',
                    }}>
                        Scientific research topic ranked well
                        school year 2024-2025
                    </Typography>
                    <Box sx={{
                        width:'80%',
                        height:'40px',
                        display:'flex',
                        flexDirection:'row',
                        marginTop:'200px',
                        justifyContent:'space-between'
                    }}>
                        <Typography sx={{
                            fontSize:'24px',
                            color:'#D82C2C',
                        }}>TS. LE NGUYEN BAO</Typography>
                        <Typography sx={{
                            fontSize:'24px',
                            color:'#D82C2C',
                        }}>DR. TRAN THI THUY TRINH</Typography>
                    </Box>

                </Box>
            </Box>
        </Box>
    )
}

export default UniverCetificate
