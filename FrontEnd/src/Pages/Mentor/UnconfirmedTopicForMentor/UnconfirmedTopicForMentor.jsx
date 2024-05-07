import { React, useEffect, useState } from 'react'
import { Outlet, useParams, useLocation, useNavigate } from "react-router-dom";
import {
    Button,
    Box,
    Typography,
    Snackbar,
    Alert,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';

// import './MentorProjectInformation.scss'
import { Reply, Clear, DonutLarge, Person, Groups, AccessAlarm, Check } from "@mui/icons-material";
import './UnconfirmedTopicForMentor.scss';
import { getUnconfirmedTopicDetailForMentor, approveTopicForMentor } from '../../../api/mentor.Api'

const UnconfirmedTopicForMentor = () => {
    const navigate = useNavigate();
    const topicCode = useParams().id;
    const [topicInfo, setTopicInfo] = useState({});
    const [message, setMessage] = useState('');
    const [isCheckAlert, setIsCheckAlert] = useState(false);
    const [alertType, setAlertType] = useState('error');
    const [openDialog, setOpenDialog] = useState(false);
    const [showProgress, setShowProgress] = useState(false);

    useEffect(() => {
        getUnconfirmedTopicDetailForMentor(topicCode)
            .then(data => {
                setTopicInfo(data);
            })
            .catch((e) => {
                console.log(e);
            })
    }, [topicCode]);
    const InfoItem = ({ label, value }) => (
        <Box className="leaderContainerRow" sx={{
            display: 'flex',
            flexDirection: 'row',
            paddingLeft: '60px',
            gap: '10px'
        }}>
            <Typography sx={{
                fontSize: '20px',
                color: '#707070',
                fontWeight: 'bold'
            }}>
                {label}:
            </Typography>
            <Typography sx={{
                fontSize: '20px',
                color: '#707070',
            }}>
                {value}
            </Typography>
        </Box>
    );

    const InfoItemMember = ({ label, value }) => (
        <Box className="leaderContainerRow" sx={{
            display: 'flex',
            flexDirection: 'row',
            paddingLeft: '60px',
            gap: '10px'
        }}>
            <Typography sx={{
                fontSize: '16px',
                color: '#707070',
                fontWeight: 'bold'
            }}>
                {label}:
            </Typography>
            <Typography sx={{
                fontSize: '16px',
                color: '#707070',
            }}>
                {value}
            </Typography>
        </Box>
    );
    const formatContent = (text) => {
        if (typeof text !== 'string') {
            return [];
        }
        const lines = text.split('\n').map((line, index) => {
            return (
                <div key={index} style={{ textIndent: `20px`, marginBottom: `10px` }}>
                    {line}
                </div>
            );
        });
        return lines;
    }
    const approveTopic = async () => {
        setOpenDialog(true);
    }

    const onApproveTopic = async () => {
        const res = await approveTopicForMentor(topicCode);
        console.log(res);
        if (res.status === 200) {
            setOpenDialog(false)
            setAlertType('success');
            setMessage(res.data);
            setShowProgress(true);
            setTimeout(() => {
                navigate('/Mentor/MentorHomepage/MentorWaitting')
            }, 2500);
        }
        else {
            // setOpenDialog(false)
            setAlertType('error');
            setMessage(res.data);
        }
        setIsCheckAlert(true);
        setTimeout(() => {
            setIsCheckAlert(false);
        }, 4000)
    }
    return (
        <Box>
            <Box ClassName="Container" sx={{
                width: '100%',
                height: 'auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginBottom: '50px'
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
                        }}>{topicInfo.facultyName}</Typography>
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
                            }}>{topicInfo.topicCode}</Typography>
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
                            fontSize: '22px',
                            color: '#707070'
                        }}>
                            <strong style={{
                                fontSize: '24px',
                                fontWeight: 'bold',
                                color: '#707070'
                            }}>Name:</strong> {topicInfo.topicName}
                        </Typography>
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
                        justifyContent: 'start',
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
                                color: '#D82C2C'
                            }}>Topic Description:</Typography>
                            <Typography id="description" sx={{
                                fontSize: '18px',
                                fontWeight: '100',
                                color: '#707070',
                                marginTop: '5px'
                            }}>{formatContent(topicInfo.topicDescription)}</Typography>
                        </Box>
                        <Box ClassName="Describle" sx={{
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
                                color: '#D82C2C'
                            }}>The Goal Of The Subject:</Typography>
                            <Typography id="description" sx={{
                                fontSize: '18px',
                                fontWeight: '100',
                                color: '#707070',
                                marginTop: '5px'
                            }}>{formatContent(topicInfo.topicGoalSubject)}</Typography>
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
                                color: '#D82C2C'
                            }}>Expected research products of the topic and applicability:</Typography>
                            <Typography ClassName="Technologyz" id="technology" sx={{
                                fontSize: '18px',
                                fontWeight: '100',
                                color: '#707070',
                                marginTop: '5px'
                            }}>
                                {formatContent(topicInfo.topicExpectedResearch)}
                            </Typography>
                        </Box>
                    </Box>
                    <Box className="right" sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '35%',
                        alignItems: 'center'
                    }}>
                        <Box ClassName="InforMB" sx={{
                            width: '100%',
                            height: '500px',
                            background: '#F6E8E8',
                            borderRadius: '20px',
                            display: 'flex',
                            justifyContent: 'center',
                            padding: '10px 0 10px 0'
                        }}>
                            <Box className="infoScroll" sx={{
                                width: '99%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                padding: '30px 0 30px 0',
                                gap: '10px',
                                overflow: 'auto',
                            }}>
                                <Box className="leader" sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    width: '90%',
                                }}>
                                    <Box className="leaderTitle" sx={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                                        <Person fontSize='large' sx={{ color: '#D82C2C' }}></Person>
                                        <Typography sx={{
                                            color: '#D82C2C',
                                            fontSize: '26px',
                                            marginLeft: '10px',
                                            fontWeight: 'bold'
                                        }}>Leader</Typography>
                                    </Box>
                                    <Box className="leaderContainer" sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                        <InfoItem label="Id" value={topicInfo.leaderID} />
                                        <InfoItem label="Name" value={topicInfo.leaderName} />
                                        <InfoItem label="Mail" value={topicInfo.leaderEmail} />
                                        <InfoItem label="Phone" value={topicInfo.leaderPhone} />
                                    </Box>
                                </Box>
                                <Box className="member" sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    width: '90%',
                                }}>
                                    <Box className="memberTitle" sx={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                                        <Groups fontSize='large' sx={{ color: '#D82C2C' }} />
                                        <Typography sx={{
                                            color: '#D82C2C',
                                            fontSize: '26px',
                                            marginLeft: '10px',
                                            fontWeight: 'bold'
                                        }}>Member</Typography>
                                    </Box>
                                    {topicInfo?.members?.map((item, index) => (
                                        <Box className="memberContainer" sx={{ display: 'flex', flexDirection: 'column' }}>
                                            <Box className="memberIndexTitle">
                                                <Typography sx={{
                                                    paddingLeft: '60px',
                                                    fontSize: '18px',
                                                    color: '#707070',
                                                    fontWeight: 'bold'
                                                }}>
                                                    Member {index + 1}
                                                </Typography>
                                            </Box>
                                            <Box className="memberIndexContainer" sx={{ paddingLeft: '10px' }}>
                                                <InfoItemMember label="Id" value={item.studentCode} />
                                                <InfoItemMember label="Name" value={item.studentFullname} />
                                                <InfoItemMember label="Mail" value={item.studentEmail} />
                                                <InfoItemMember label="Phone" value={item.studentPhone} />
                                            </Box>
                                        </Box>
                                    ))}
                                </Box>

                                <Box className="time" sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    width: '90%',
                                }}>
                                    <Box className="timeTitle" sx={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                                        <AccessAlarm fontSize='large' sx={{ color: '#D82C2C' }}></AccessAlarm>
                                        <Typography sx={{
                                            color: '#D82C2C',
                                            fontSize: '26px',
                                            marginLeft: '10px',
                                            fontWeight: 'bold'
                                        }}>Execution Time</Typography>
                                    </Box>
                                    <Box className="leaderContainer" sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                        <InfoItem label="Start Time" value={topicInfo.topicDateStart} />
                                        <InfoItem label="End Time" value={topicInfo.topicDateEnd} />

                                    </Box>
                                </Box>

                                <Box className="status" sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    width: '90%',
                                }}>
                                    <Box className="statusTitle" sx={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                                        <DonutLarge fontSize='large' sx={{ color: '#D82C2C' }}></DonutLarge>
                                        <Typography sx={{
                                            color: '#D82C2C',
                                            fontSize: '26px',
                                            marginLeft: '10px',
                                            fontWeight: 'bold'
                                        }}>Status</Typography>
                                    </Box>
                                    <Box className="statusContainer" sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                        <Typography sx={{
                                            fontSize: '20px',
                                            color: '#707070',
                                            paddingLeft: '60px',
                                        }}>
                                            Waiting for Mentor Approval
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                        <Box className="function" sx={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '2%',
                            paddingTop: '50px',
                            justifyContent: 'center'
                        }}>
                            <Button className="reject" sx={{
                                width: '48%',
                                height: '45px',
                                background: '#D82C2C',
                                border: '1px solid #D82C2C',
                                borderRadius: '10px',
                                fontSize: '20px',
                                color: '#fff',
                                padding: '0 20px',
                                fontSize: '25px',
                                gap: '10px',
                                textTransform: 'none',
                                '&:hover': {
                                    background: '#fff',
                                    color: '#D82C2C',
                                }
                            }}>
                                <Clear fontSize='large' />Reject
                            </Button>
                            <Button
                                onClick={approveTopic}
                                className="approve"
                                sx={{
                                    width: '48%',
                                    height: '45px',
                                    textTransform: 'none',
                                    background: '#41B06E',
                                    border: '1px solid #41B06E',
                                    borderRadius: '10px',
                                    fontSize: '25px',
                                    color: '#fff',
                                    padding: '0 20px',
                                    gap: '10px',
                                    '&:hover': {
                                        background: '#fff',
                                        color: '#41B06E',
                                    }
                                }}>
                                <Check fontSize='large' />Approve
                            </Button>
                        </Box>
                        <Button
                            onClick={() => { navigate('/Mentor/MentorHomepage/MentorWaitting') }}
                            className="Back" sx={{
                                marginTop: '20px',
                                height: '45px',
                                background: '#1e385d',
                                border: '1px solid #1e385d',
                                borderRadius: '10px',
                                fontSize: '20px',
                                color: '#fff',
                                width: '100%',
                                fontSize: '25px',
                                gap: '10px',
                                textTransform: 'none',
                                '&:hover': {
                                    background: '#fff',
                                    color: '#1e385d',
                                }
                            }}>
                            <Reply fontSize='large' />Back Waiting Page
                        </Button>
                    </Box>
                </Box>
            </Box>

            <Dialog sx={{
                '& .MuiDialog-paper': {
                    width: '80%',
                    maxWidth: 'lg',
                },
            }}
                open={openDialog}
                // onClose=''
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" sx={{ color: '#D82C2C', fontWeight: 'bold', fontSize: '25px' }}>
                    {`Read the information carefully before browsing Topic!`}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Box className="dialogContain" sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px'
                        }}>
                            {/* Topic Code */}
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column'
                            }}>
                                <Typography sx={{ fontWeight: 'bold', color: '#1e385d', textDecoration: 'underline', fontSize: '20px' }}>Topic Name: </Typography>
                                <Typography sx={{ marginLeft: '10px', fontWeight: 'bold', color: '#D82C2C', fontSize: '17px' }}>{formatContent(topicInfo.topicCode)}</Typography>
                            </Box>

                            {/* Topic Name */}
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column'
                            }}>
                                <Typography sx={{ fontWeight: 'bold', color: '#1e385d', textDecoration: 'underline', fontSize: '20px' }}>Topic Name: </Typography>
                                <Typography sx={{ marginLeft: '10px', fontWeight: 'bold', color: '#D82C2C', fontSize: '17px' }}>{formatContent(topicInfo.topicName)}</Typography>
                            </Box>

                            {/* Topic Description */}
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column'
                            }}>
                                <Typography sx={{ fontWeight: 'bold', color: '#1e385d', textDecoration: 'underline', fontSize: '20px' }}>Topic Description: </Typography>
                                <Typography sx={{ marginLeft: '10px', fontWeight: 'bold', color: '#D82C2C', fontSize: '17px' }}>{formatContent(topicInfo.topicDescription)}</Typography>
                            </Box>

                            {/* Topic Goal Of The Subject */}
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column'
                            }}>
                                <Typography sx={{ fontWeight: 'bold', color: '#1e385d', textDecoration: 'underline', fontSize: '20px' }}>Topic Goal Of The Subject: </Typography>
                                <Typography sx={{ marginLeft: '10px', fontWeight: 'bold', color: '#D82C2C', fontSize: '17px' }}>{formatContent(topicInfo.topicGoalSubject)}</Typography>
                            </Box>

                            {/* Topic expected research products of the topic and applicability */}
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column'
                            }}>
                                <Typography sx={{ fontWeight: 'bold', color: '#1e385d', textDecoration: 'underline', fontSize: '20px' }}>Topic expected research products of the topic and applicability: </Typography>
                                <Typography sx={{ marginLeft: '10px', fontWeight: 'bold', color: '#D82C2C', fontSize: '17px' }}>{formatContent(topicInfo.topicExpectedResearch)}</Typography>
                            </Box>

                        </Box>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)} className="reject" sx={{
                        background: '#1e385d',
                        border: '1px solid #1e385d',
                        borderRadius: '5px',
                        fontSize: '20px',
                        color: '#fff',
                        padding: '0 20px',
                        fontSize: '20px',
                        gap: '10px',
                        textTransform: 'none',
                        '&:hover': {
                            background: '#fff',
                            color: '#1e385d',
                        }
                    }}>
                        <Clear fontSize='large' />Cancel
                    </Button>
                    <Button
                        autoFocus
                        onClick={onApproveTopic}
                        className="approve"
                        sx={{
                            textTransform: 'none',
                            background: '#D82C2C',
                            border: '1px solid #D82C2C',
                            borderRadius: '5px',
                            fontSize: '20px',
                            color: '#fff',
                            padding: '0 20px',
                            gap: '10px',
                            '&:hover': {
                                background: '#fff',
                                color: '#D82C2C',
                            }
                        }}>
                        <Check fontSize='large' />Approve
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={isCheckAlert} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert variant="filled" severity={alertType}>{message}</Alert>
            </Snackbar>
            <Box sx={{ display: 'flex' }}>
                {showProgress && (
                    <div className="overlay">
                        <CircularProgress style={{ color: '#D82C2C' }} className="progress" />
                    </div>
                )}
            </Box>
        </Box>

    )
}

export default UnconfirmedTopicForMentor;