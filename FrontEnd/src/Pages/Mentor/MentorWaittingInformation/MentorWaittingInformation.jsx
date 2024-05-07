import React from 'react'
import { Outlet, NavLink, useLocation } from "react-router-dom";
import { Button, Box, Typography } from "@mui/material";
import './MentorWaittingInformation.scss'
import { Article, Person2, Link, Person, Groups, AccessAlarm, WorkspacePremium } from "@mui/icons-material";


const MentorWaittingInformation = () => {
    return (
        <div>
            <Box ClassName="Container" sx={{
                width: '100%',
                height: 'auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <Box ClassName="Title" sx={{
                    width: '90%',
                    height: '140px',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'end',
                    justifyContent: 'space-between'
                }}>
                    <Box sx={{
                        width: '50%',
                        height: '90%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'start',
                        justifyContent: 'end'
                    }}>
                        <Typography sx={{
                            fontSize: '30px',
                            fontWeight: 'bold',
                            color: '#D82C2C'
                        }}>Khoa Công Nghệ Phần Mềm</Typography>
                        <Box sx={{
                            width: '100%',
                            height: '50px',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'start',
                            alignItems: 'start',
                        }}>
                            <Typography sx={{
                                fontSize: '24px',
                                fontWeight: 'bold',
                                color: '#707070'
                            }}>Project Code : </Typography>
                            <Typography sx={{
                                marginTop: '6.4px',
                                marginLeft: '10px',
                                fontSize: '18px',
                                color: '#707070'
                            }}>PJ01SA</Typography>
                        </Box>
                    </Box>
                    <Box sx={{
                        width: '45%',
                        height: '95px',
                        display: 'flex',
                        alignItems: 'start',
                        justifyContent: 'start'
                    }}>
                        <Typography sx={{
                            fontSize: '20px',
                            color: '#707070'
                        }}>SyncStudy : Manage scientific research projects for students in Duy Tan University </Typography>
                    </Box>
                </Box>
                <Box sx={{
                    marginTop: '25px',
                    width: '90%',
                    height: 'auto',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'start'
                }}>
                    <Box ClassName="InforPR" sx={{
                        width: '65%',
                        height: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'start',
                        justifyContent: 'start'
                    }}>
                        <Box ClassName="Describle" sx={{
                            width: '95%',
                            height: 'auto',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'start',
                            justifyContent: 'start'
                        }}>
                            <Typography sx={{
                                fontSize: '20px',
                                fontWeight: '600',
                                color: '#707070'
                            }}>Describle</Typography>
                            <Typography id="description" sx={{
                                fontSize: '18px',
                                fontWeight: '100',
                                color: '#707070',
                                marginTop: '5px'
                            }}>This project aims to solve the problem of managing
                                scientific research projects at Duy Tan University.
                                Creating a website makes it convenient to register,
                                interact, manage and report students' scientific research projects.
                                Helps lecturers and schools closely follow projects,
                                accurately and completely summarize
                                statistics for each department and group.</Typography>
                        </Box>
                        <Box ClassName="Technology" sx={{
                            width: '95%',
                            height: 'auto',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'start',
                            justifyContent: 'start',
                            marginTop: '50px'
                        }}>
                            <Typography sx={{
                                fontSize: '20px',
                                fontWeight: '600',
                                color: '#707070'
                            }}>Technology</Typography>
                            <Typography ClassName="Technologyz" id="technology" sx={{
                                fontSize: '18px',
                                fontWeight: '100',
                                color: '#707070',
                                marginTop: '5px'
                            }}>
                                Frontend : HTML,CSS,React,JavaScript
                            </Typography>
                            <Typography ClassName="Technologyz" id="technology1" sx={{
                                fontSize: '18px',
                                fontWeight: '100',
                                color: '#707070',
                                marginTop: '5px'
                            }}>
                                Back-end : Java.
                            </Typography>
                            <Typography ClassName="Technologyz" id="technology2" sx={{
                                fontSize: '18px',
                                fontWeight: '100',
                                color: '#707070',
                                marginTop: '5px'
                            }}>
                                Database management system : SQL Server.
                            </Typography>
                            <Typography ClassName="Technologyz" id="technology3" sx={{
                                fontSize: '18px',
                                fontWeight: '100',
                                color: '#707070',
                                marginTop: '5px'
                            }}>
                                Design UI : Figma
                            </Typography>
                            <Typography ClassName="Technologyz" id="technology4" sx={{
                                fontSize: '18px',
                                fontWeight: '100',
                                color: '#707070',
                                marginTop: '5px'
                            }}>
                                Other tools : Postman, trello,github...
                            </Typography>
                        </Box>
                    </Box>
                    <Box ClassName="InforTeam" sx={{
                        width: '35%',
                        height: 'auto',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'start'
                    }}>
                        <Box sx={{
                            width: '90%',
                            height: '600px',
                            background: '#F6E8E8',
                            border: 'solid 0.5px #707070',
                            borderRadius: '30px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-evenly',
                            alignItems: 'center'
                        }}>
                            <Box sx={{
                                width: '100%',
                                height: 'auto',
                                display: 'flex',
                                flexDirection: 'column'

                            }}>
                                <Box sx={{
                                    marginLeft: '10px',
                                    width: '90%',
                                    height: 'auto',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'start',
                                    alignItems: 'center'
                                }}>
                                    <Person fontSize='large' sx={{ color: '#707070' }}></Person>
                                    <Typography sx={{
                                        color: '#707070',
                                        fontSize: '18px',
                                        marginLeft: '10px',
                                        fontWeight: 'bold'
                                    }}>Leader</Typography>
                                </Box>
                                <Box sx={{
                                    marginLeft: '48px',
                                    marginTop: '6px',
                                    width: '90%',
                                    height: 'auto',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'start'
                                }}>
                                    <Typography sx={{
                                        color: '#707070',
                                        fontSize: '18px',
                                        marginLeft: '10px',
                                        marginTop: '4px'
                                    }}>Nguyen Tran Anh Thang</Typography>
                                    <Typography sx={{
                                        color: '#707070',
                                        fontSize: '18px',
                                        marginLeft: '10px',
                                        marginTop: '4px'
                                    }}>anhthang2529@gmail.com
                                    </Typography>
                                    <Typography sx={{
                                        color: '#707070',
                                        fontSize: '18px',
                                        marginLeft: '10px',
                                        marginTop: '4px'
                                    }}>0869132529</Typography>
                                </Box>
                            </Box>
                            <Box sx={{
                                width: '100%',
                                height: 'auto',
                                display: 'flex',
                                flexDirection: 'column'

                            }}>
                                <Box sx={{
                                    marginLeft: '10px',
                                    width: '90%',
                                    height: 'auto',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'start',
                                    alignItems: 'center'
                                }}>
                                    <Groups fontSize='large' sx={{ color: '#707070' }}></Groups>
                                    <Typography sx={{
                                        color: '#707070',
                                        fontSize: '18px',
                                        marginLeft: '10px',
                                        fontWeight: 'bold'
                                    }}>Group Members</Typography>
                                </Box>
                                <Box sx={{
                                    marginLeft: '48px',
                                    marginTop: '6px',
                                    width: '90%',
                                    height: 'auto',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'start'
                                }}>
                                    <Typography sx={{
                                        color: '#707070',
                                        fontSize: '18px',
                                        marginLeft: '10px',
                                        marginTop: '4px'
                                    }}>Nguyen Hoang Quoc Anh</Typography>
                                    <Typography sx={{
                                        color: '#707070',
                                        fontSize: '18px',
                                        marginLeft: '10px',
                                        marginTop: '4px'
                                    }}>Duong Nguyen Cong Luan
                                    </Typography>
                                    <Typography sx={{
                                        color: '#707070',
                                        fontSize: '18px',
                                        marginLeft: '10px',
                                        marginTop: '4px'
                                    }}>Nguyen Quoc Nhat</Typography>
                                </Box>
                            </Box>
                            <Box className="waittingButton" sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                height: 'auto',
                                alignItems: "center",
                                justifyContent: "center",
                                gap: '30px'
                            }}>
                                <Button sx={{
                                    backgroundColor: "#D9D9D9",
                                    border: "5px solid #D82C2C",
                                    borderRadius: "20px",
                                    width: "150px",
                                    height: "50px",
                                    color: "#000",
                                    fontWeight: "bold",
                                    fontSize: "20px"
                                }}>
                                    Accept
                                </Button>

                                <Button sx={{
                                    backgroundColor: "#D9D9D9",
                                    border: "5px solid #D82C2C",
                                    borderRadius: "20px",
                                    width: "150px",
                                    height: "50px",
                                    color: "#000",
                                    fontWeight: "bold",
                                    fontSize: "20px"
                                }}>
                                    Refuse
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </div>
    )
}

export default MentorWaittingInformation
