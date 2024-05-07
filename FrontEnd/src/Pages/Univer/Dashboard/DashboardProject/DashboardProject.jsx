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
import BasicPie from "./ChartProject/BasicPie";
const DashboardProject = () => {
    return (
        <div>
            <Box sx={{
                marginTop: '20px',
                width: '100%',
                height: '700px',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column'
            }}>
                <Box className="Chart" sx={{
                    marginTop: '30px',
                    width: '75%',
                    height: '80%',
                    background: '#FFFFFF',
                    border: '2px solid #999999',
                    borderRadius: '10px'
                }}>
                    <Box sx={{
                        width: '100%',
                        height: '10%',
                        display: 'flex',
                        alignItems: 'end'
                    }}>
                        <Typography sx={{
                            marginLeft: '30px',
                            color: '#D82C2C',
                            fontSize: '26px',
                            fontWeight: 'bold'
                        }}>Project</Typography>
                    </Box>
                    <Box sx={{
                        width: '100%',
                        height: '90%',
                        display: 'flex',
                        flexDirection: 'row'
                    }}>
                        <Box className="Chart_Project" sx={{
                            width: '60%',
                            height: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginLeft: '30px',
                        }}>
                            <BasicPie></BasicPie>
                        </Box>
                        <Box sx={{
                            marginTop: '20px',
                            width: '40%',
                            height: '70%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'space-evenly'
                        }}>
                            <Box sx={{
                                width: '90%',
                                height: '60px',
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-evenly'
                            }}>
                                <Box sx={{
                                    width: '80px',
                                    height: '45px',
                                    background: '#DC143C'
                                }}>
                                </Box>
                                <Typography
                                    sx={{
                                        width: '150px',
                                        color: '#999999',
                                        fontSize: '18px',
                                        fontWeight: 'bold'

                                    }}>Project Achieved</Typography>

                            </Box>
                            <Box sx={{
                                width: '90%',
                                height: '60px',
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-evenly'
                            }}>
                                <Box sx={{
                                    width: '80px',
                                    height: '45px',
                                    background: '#F08080'
                                }}>
                                </Box>
                                <Typography
                                    sx={{
                                        width: '150px',
                                        color: '#999999',
                                        fontSize: '18px',
                                        fontWeight: 'bold'

                                    }}>Project achieved good grade</Typography>

                            </Box>
                            <Box sx={{
                                width: '90%',
                                height: '60px',
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-evenly'
                            }}>
                                <Box sx={{
                                    width: '80px',
                                    height: '45px',
                                    background: '#FFA07A'
                                }}>
                                </Box>
                                <Typography
                                    sx={{
                                        width: '150px',
                                        color: '#999999',
                                        fontSize: '18px',
                                        fontWeight: 'bold'

                                    }}>Project achieved excellent grade</Typography>

                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{
                    width: '70%',
                    height: '80px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Typography sx={{
                        fontSize: '26px',
                        color: '#999999'
                    }}>
                        Statistical ranking of scientific research projects
                    </Typography>
                </Box>
            </Box>
        </div>
    )
}

export default DashboardProject
