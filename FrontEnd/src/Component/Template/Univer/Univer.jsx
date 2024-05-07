import React, { useEffect, useState } from "react";
import { Outlet, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Button, Box, Typography } from "@mui/material";
import logoDTU from "../../../assets/Logo-DuyTan.png";
import avatar from "../../../assets/QN.jpg";
import "./Univer.scss";
import { CardMembership, SpaceDashboard, Dashboard, Logout } from "@mui/icons-material";
import { getInfo } from '../../../api/infoApi'

const Univer = () => {

    const { pathname: url } = useLocation();
    const navigate = useNavigate();
    const [user, setUser] = useState();


    useEffect(() => {
        if (!localStorage.getItem('accessToken')) {
            navigate('/')
        }
    }, [])

    useEffect(() => {
        getInfo()
            .then(data => {
                setUser(data)
            })
            .catch(e => {
                console.log(e);
            })
    }, [])

    useEffect(() => {
        const navLinks = document.getElementsByClassName("listBar");
        for (let i = 0; i < navLinks.length; i += 1) {
            if (navLinks[i].classList.contains("active")) {
                navLinks[i].childNodes[0].classList.add("isActive");
            } else {
                navLinks[i].childNodes[0].classList.remove("isActive");
            }
        }
    }, [url]);

    const homeClick = () => {
        window.location.href = "/Univer/Dashboard/faculty"
    }

    const userInfo = {
        userName: "Nguyễn Quốc Nhật",
        userEmail: "nguyenquocnhat@gmail.com",
    };

    const logOut = () => {
        localStorage.removeItem('accessToken');
        navigate('/')
    }
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row'
        }}>
            <Box className="sideBar" sx={{
                width: '16.5%',
                position: 'fixed',
                height: '100vh',
                background: '#F6E6E6',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start'

            }}>
                <img src={logoDTU} alt="Logo"
                    width="80%"
                    style={{
                        marginTop: "50px",
                        cursor: "pointer",
                    }}
                    onClick={homeClick}
                />
                <Box
                    sx={{ height: "1px", width: "70%", background: "#707070", marginTop: "14px" }}
                ></Box>
                <Box className="sideBar_Univer"
                    sx={{
                        display: "flex",
                        width: "80%",
                        height: "100%",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "10px",
                        marginTop: "20px"
                    }}
                >
                    <Box className="sideBar_Items"
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                            width: "100%",
                        }}
                    >
                        <NavLink to="/Univer/Dashboard/faculty" className="listBar">
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    gap: "10px",
                                    height: "60px",
                                    paddingLeft: "10px",
                                }}
                            >
                                <SpaceDashboard fontSize="large" sx={{ color: "#D82C2C" }} />
                                <Typography
                                    sx={{
                                        color: "#D82C2C",
                                        fontWeight: "bold",
                                        fontSize: "20px",
                                    }}
                                >
                                    Dashboard
                                </Typography>
                            </Box>
                        </NavLink>

                        <NavLink to="/Univer/DashboadDetail" className="listBar">
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    gap: "10px",
                                    height: "60px",
                                    paddingLeft: "10px",
                                }}
                            >
                                <Dashboard fontSize="large" sx={{ color: "#D82C2C" }} />
                                <Typography
                                    sx={{
                                        color: "#D82C2C",
                                        fontWeight: "bold",
                                        fontSize: "20px",
                                    }}
                                >
                                    Dashboard Details
                                </Typography>
                            </Box>
                        </NavLink>

                        <NavLink to="/Univer/Certificate" className="listBar">
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    gap: "10px",
                                    height: "60px",
                                    paddingLeft: "10px",
                                }}
                            >
                                <CardMembership fontSize="large" sx={{ color: "#D82C2C" }} />
                                <Typography
                                    sx={{
                                        color: "#D82C2C",
                                        fontWeight: "bold",
                                        fontSize: "20px",
                                    }}
                                >
                                    Certificate
                                </Typography>
                            </Box>
                        </NavLink>
                        <Button
                            onClick={logOut}
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: 'left',
                                gap: "10px",
                                height: "50px",
                                paddingLeft: "10px",
                                textTransform: 'none'
                            }}>
                            <Box sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                            }} >
                                <Logout fontSize="large" sx={{
                                    color: '#D82c2c',
                                    transform: 'rotate(180deg)'
                                }} />
                                <Typography sx={{
                                    color: "#D82C2C",
                                    fontWeight: "bold",
                                    fontSize: "20px",
                                }}>
                                    Logout
                                </Typography>
                            </Box>
                        </Button>
                    </Box>
                    <Box
                        className="accountBox"
                        sx={{
                            borderTop: "1px Solid #707070",
                            marginBottom: "40px",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            paddingTop: "10px",
                            gap: "3px",
                        }}
                    >
                        <Box className="avatar">
                            <img className="avatar" src={`http://localhost:2109/info/avatar/${user?.accountId}_univer`} alt="avatar" width="50px" />
                        </Box>
                        <Box
                            className="infor"
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                            }}
                        >
                            <Box className="userName">
                                <Typography
                                    sx={{
                                        fontSize: "12px",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {user?.univerName}
                                </Typography>
                            </Box>
                            <Box className="userEmail">
                                <Typography
                                    sx={{
                                        fontSize: "12px",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {user?.univerEmail}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box sx={{
                width: '83.5%',
                marginLeft: '16.5%'
            }}>
                <Outlet />
            </Box>
        </Box>
    );
};

export default Univer;
