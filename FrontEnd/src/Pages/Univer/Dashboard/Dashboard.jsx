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
import { School, AccountTree, Person } from "@mui/icons-material";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import "./Dashboard.scss"


const Dashboard = () => {

    const { pathname: url } = useLocation();
    useEffect(() => {
        const navLinks = document.getElementsByClassName("list_items");
        for (let i = 0; i < navLinks.length; i += 1) {
            if (navLinks[i].classList.contains("active")) {
                navLinks[i].childNodes[0].classList.add("isActive2");
            } else {
                navLinks[i].childNodes[0].classList.remove("isActive2");
            }
        }
    }, [url]);


    return (
        <Box className="container" sx={{
            background: '#F9F9F9',
            height: '100vh',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <Box sx={{
                width: '100%',
                height: '100px',
                display: 'flex',
                alignItems: 'end',
            }}>
                <Typography sx={{
                    fontSize: '30px',
                    fontWeight: 'bold',
                    color: '#D82C2C',
                    marginLeft: '50px'
                }}>
                    Dashboard
                </Typography>
            </Box>
            <Box className="Items_Dashboard"
                sx={{
                    width: '100%',
                    height: '120px',
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    alignItems: 'end'
                }}>
                <NavLink to="/Univer/Dashboard/Faculty" className="list_items">
                    <Box className="Dashboard_Item"
                        sx={{
                            width: '60%',
                            height: '100px',
                            borderRadius: '30px',
                            display: 'flex',
                            background: '#FFFFFF',
                            border: 'solid 2px #999999',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s',
                        }}>
                        <Box sx={{
                            width: '50%',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Typography sx={{
                                fontSize: '25px',
                                fontWeight: 'bold',
                                color: '#D82C2C',
                            }}>7</Typography>
                            <Typography sx={{
                                fontSize: '20px',
                                fontWeight: 'bold',
                                color: '#999999',
                            }}>Faculty</Typography>
                        </Box>
                        <Box
                            sx={{
                                width: '30%',
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                            }}>
                            <School fontSize="inherit" sx={{ color: "#D82C2C", fontSize: "3rem" }} />

                        </Box>
                    </Box>
                </NavLink>
                <NavLink to="/Univer/Dashboard/Project" className="list_items">
                    <Box className="Dashboard_Item"
                        sx={{
                            width: '60%',
                            height: '100px',
                            borderRadius: '30px',
                            display: 'flex',
                            background: '#FFFFFF',
                            border: 'solid 2px #999999',
                            justifyContent: 'center'
                        }}>
                        <Box sx={{
                            width: '50%',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Typography sx={{
                                fontSize: '25px',
                                fontWeight: 'bold',
                                color: '#D82C2C',
                            }}>132</Typography>
                            <Typography sx={{
                                fontSize: '20px',
                                fontWeight: 'bold',
                                color: '#999999',
                            }}>Project</Typography>
                        </Box>
                        <Box
                            sx={{
                                width: '30%',
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                            }}>
                            <AccountTree fontSize="inherit" sx={{ color: "#D82C2C", fontSize: "3rem" }} />

                        </Box>
                    </Box>
                </NavLink>
                <NavLink to="/Univer/Dashboard/Students" className="list_items">
                    <Box className="Dashboard_Item"
                        sx={{
                            width: '60%',
                            height: '100px',
                            borderRadius: '30px',
                            display: 'flex',
                            background: '#FFFFFF',
                            border: 'solid 2px #999999',
                            justifyContent: 'center'
                        }}>
                        <Box sx={{
                            width: '50%',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Typography sx={{
                                fontSize: '25px',
                                fontWeight: 'bold',
                                color: '#D82C2C',
                            }}>548</Typography>
                            <Typography sx={{
                                fontSize: '20px',
                                fontWeight: 'bold',
                                color: '#999999',
                            }}>Students</Typography>
                        </Box>
                        <Box
                            sx={{
                                width: '30%',
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                            }}>
                            <Person fontSize="inherit" sx={{ color: "#D82C2C", fontSize: "3rem" }} />

                        </Box>
                    </Box>
                </NavLink>


            </Box>
            <Box sx={{
                width: '100%',
            }}>
                <Outlet />
            </Box>
        </Box>
    )
}

export default Dashboard
