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
import { School, WorkspacePremium } from "@mui/icons-material";
import { Outlet, NavLink, useLocation } from "react-router-dom";
const DashboardStudent = () => {
    return (
        <div>
            <Box sx={{
                marginTop: '20px',
                width: '100%',
                height: '700px',
                display: 'flex',
                justifyContent: 'center',
            }}>
                <Box className="Chart" sx={{
                    marginTop: '30px',
                    width: '75%',
                    height: '85%',
                    background: '#FFFFFF',
                    border: '2px solid #999999',
                    borderRadius: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
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
                            fontSize: '20px',
                            fontWeight: 'bold'
                        }}>Students</Typography>
                    </Box>
                    <Box className="Arrange" sx={{
                        marginTop: '20px',
                        width: '90%',
                        height: '70%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent:'center'
                    }}>
                        <Box sx={{
                            width: '100%',
                            height: '45%',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center'
                        }}>
                            <Box className="Dashboard_Item"
                                sx={{
                                    width: '30%',
                                    height: '70%',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    background: '#FFFFFF',
                                    border: 'solid 2px #999999',
                                    justifyContent: 'center',

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
                                        fontSize: '35px',
                                        fontWeight: 'bold',
                                        color: '#D82C2C',
                                    }}>62</Typography>
                                    <Typography sx={{
                                        fontSize: '20px',
                                        fontWeight: 'bold',
                                        color: '#999999',
                                        lineHeight: '0.8'
                                    }}>Students</Typography>
                                </Box>
                                <Box
                                    sx={{
                                        width: '30%',
                                        height: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}>
                                    <WorkspacePremium fontSize="inherit" sx={{ color: "#FEE101", fontSize: "3.5rem" }} />

                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{
                            width: '100%',
                            height: '45%',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-evenly'
                        }}>
                            <Box className="Dashboard_Item"
                                sx={{
                                    width: '30%',
                                    height: '70%',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    background: '#FFFFFF',
                                    border: 'solid 2px #999999',
                                    justifyContent: 'center',

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
                                        fontSize: '35px',
                                        fontWeight: 'bold',
                                        color: '#D82C2C',
                                    }}>137</Typography>
                                    <Typography sx={{
                                        fontSize: '20px',
                                        fontWeight: 'bold',
                                        color: '#999999',
                                        lineHeight: '0.8'
                                    }}>Students</Typography>
                                </Box>
                                <Box
                                    sx={{
                                        width: '30%',
                                        height: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}>
                                    <WorkspacePremium fontSize="inherit" sx={{ color: "#A7A7AD", fontSize: "3.5rem" }} />

                                </Box>
                            </Box>
                            <Box className="Dashboard_Item"
                                sx={{
                                    width: '30%',
                                    height: '70%',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    background: '#FFFFFF',
                                    border: 'solid 2px #999999',
                                    justifyContent: 'center',

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
                                        fontSize: '35px',
                                        fontWeight: 'bold',
                                        color: '#D82C2C',
                                    }}>312</Typography>
                                    <Typography sx={{
                                        fontSize: '20px',
                                        fontWeight: 'bold',
                                        color: '#999999',
                                        lineHeight: '0.8'
                                    }}>Students</Typography>
                                </Box>
                                <Box
                                    sx={{
                                        width: '30%',
                                        height: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}>
                                    <WorkspacePremium fontSize="inherit" sx={{ color: "#A77044", fontSize: "3.5rem" }} />

                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box className="Notices" sx={{
                        width: '90%',
                        height: '75px',
                        borderRadius: '10px',
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <Box sx={{
                            width: '100%',
                            height: '45%',
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <WorkspacePremium fontSize="inherit" sx={{ color: "#FEE101", fontSize: "2rem" }} />
                            <Typography sx={{
                                marginLeft: '10px',
                                fontSize: '20px',
                                fontWeight: 'bold',
                                color: '#999999',
                            }}>Students achieve Excellent grades</Typography>
                        </Box>
                        <Box sx={{
                            width: '100%',
                            height: '45%',
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Box sx={{
                                width: '100%',
                                height: '45%',
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <WorkspacePremium fontSize="inherit" sx={{ color: "#A7A7AD", fontSize: "2rem" }} />
                                <Typography sx={{
                                    marginLeft: '10px',
                                    fontSize: '20px',
                                    fontWeight: 'bold',
                                    color: '#999999',
                                }}>Students achieve Good grades</Typography>
                            </Box>
                            <Box sx={{
                                width: '100%',
                                height: '45%',
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <WorkspacePremium fontSize="inherit" sx={{ color: "#A77044", fontSize: "2rem" }} />
                                <Typography sx={{
                                    marginLeft: '10px',
                                    fontSize: '20px',
                                    fontWeight: 'bold',
                                    color: '#999999',
                                }}>Number of students passing</Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </div>
    )
}

export default DashboardStudent
