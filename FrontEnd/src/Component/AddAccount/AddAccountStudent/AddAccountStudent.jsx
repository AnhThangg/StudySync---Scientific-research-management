import { React, useState, useEffect } from 'react'
import {
    Button,
    Box,
    Typography,
    TextField,
    MenuItem,
    Input,
    IconButton,
    Snackbar,
    Alert,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from "@mui/material";
import { getDistricts, getProvinces, getWards } from '../../../api/unitVietNamApi';
import { getAllCodeUniver } from '../../../api/univerApi'
import { getAllFacultiesCodeForUniver } from '../../../api/mentor.Api';
import { createAccount } from '../../../api/adminApi';

const AddAccountStudent = () => {
    const [universCode, setUniversCode] = useState([]);
    const [univerCode, setUniverCode] = useState();
    const [facultiesCode, setFacultiesCode] = useState([]);
    const [facultyCode, setFacultyCode] = useState();
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [province, setProvince] = useState();
    const [district, setDistrict] = useState();
    const [ward, setWard] = useState();
    const [address, setAddress] = useState();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [studentCode, setStudentCode] = useState('');
    const [studentFullname, setStudentFullname] = useState('');
    const [studentSex, setStudentSex] = useState('1');
    const [studentBirthday, setStudentBirthday] = useState('');
    const [studentPhone, setStudentPhone] = useState('');
    const [studentEmail, setStudentEmail] = useState('');
    const [studentClass, setStudentClass] = useState('');
    const [studentAddress, setStudentAddress] = useState('');
    const [message, setMessage] = useState('');
    const [isCheckAlert, setIsCheckAlert] = useState(false);
    const [alertType, setAlertType] = useState('error');
    const [openDialog, setOpenDialog] = useState(false);
    const [key, setKey] = useState(0);

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

    useEffect(() => {
        getAllCodeUniver()
            .then(data => {
                setUniversCode(data);
            })
            .catch(e => {
                console.log(e);
            });
    }, []);

    useEffect(() => {
        getAllFacultiesCodeForUniver(univerCode?.code)
            .then(data => {
                setFacultiesCode(data);
            })
            .catch(e => {
                console.log(e)
            })
    }, [univerCode]);

    useEffect(() => {
        getProvinces()
            .then(data => {
                setProvinces(data)
            })
            .catch(e => {
                console.log(e);
            })
    }, []);

    useEffect(() => {
        getDistricts(province?.code)
            .then(data => {
                setDistricts(data)
            })
            .catch(e => {
                console.log(e)
            })
    }, [province]);

    useEffect(() => {
        getWards(district?.code)
            .then(data => {
                setWards(data)
            })
            .catch(e => {
                console.log(e)
            })
    }, [district]);

    const validateEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    const validPhoneNumber = (phoneNumber) => {
        const phonePattern = /^\d{10}$/;
        return phonePattern.test(phoneNumber);
    }

    const checkTextField = () => {
        // setMessage('Please fill in information in Address');
        (!address) && setMessage('Please fill in information in Address');
        (!ward) && setMessage('Please fill in information in Ward');
        (!district) && setMessage('Please fill in information in District');
        (!province) && setMessage('Please fill in information in Province');
        (!validPhoneNumber(studentPhone)) && setMessage('Invalid Phone Number');
        (!studentPhone) && setMessage('Please fill in information in Student Phone');
        (!validateEmail(studentEmail)) && setMessage('Invalid email');
        (!studentEmail) && setMessage('Please fill in information in Student Email');
        (!studentClass) && setMessage('Please fill in information in Mentor Student Class');
        (!studentBirthday) && setMessage('Please fill in information in Student Birthday');
        (!studentCode) && setMessage('Please fill in information in Student Code');
        (!studentFullname) && setMessage('Please fill in information in Student Name');
        (facultyCode.length === 0) && setMessage('Please fill in information in Faculty');
        (univerCode.length === 0) && setMessage('Please fill in information in University');
        (!password) && setMessage('Please fill in information in Password');
        (!userName) && setMessage('Please fill in information in Username');
        if (!univerCode || !facultyCode || !address || !ward || !district || !province || !studentPhone || !studentEmail || !studentClass || !studentBirthday || !studentCode || !studentFullname || !password || !userName || !validateEmail(studentEmail) || !validPhoneNumber(studentPhone) || !studentSex) {
            console.log(!studentSex)
            setAlertType('error');
            setIsCheckAlert(true);
            setTimeout(() => {
                setIsCheckAlert(false);
            }, 4000)
        } else {
            setStudentAddress(address + ', ' + ward.name + ', ' + district.name + ', ' + province.name)
            setOpenDialog(true);
        }
    }

    const onAddAccount = async () => {
        const res = await createAccount('student', {
            userName,
            password,
            studentCode,
            studentFullname,
            studentSex,
            studentBirthday,
            studentEmail,
            studentPhone,
            studentClass,
            studentAddress,
            facultyCode: facultyCode.code
        })
        if (res.status === 200) {
            setOpenDialog(false);
            setAlertType('success');
            setMessage(res.data);
            setUserName('');
            setPassword('');
            setStudentFullname('');
            setStudentCode('');
            setStudentSex('1');
            setStudentBirthday('');
            setStudentClass('');
            setStudentEmail('');
            setStudentPhone('');
            setProvince(undefined);
            setDistrict(undefined);
            setWard(undefined);
            setAddress('');
            setUniverCode([]);
            setFacultyCode([]);
            setKey((prevKey) => prevKey + 1);
        } else {
            setOpenDialog(false)
            setAlertType('error');
            setMessage(res.data);
        }
        setIsCheckAlert(true);
        setTimeout(() => {
            setIsCheckAlert(false);
        }, 4000)
    }
    return (
        <Box className="container" sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '25px',
            marginBottom: '20px'
        }}>
            <Box key={key} className="containerTop" sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: '5%',
            }}>
                <Box className="containerTopLeft" sx={{
                    width: '75%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px'
                }}>
                    <Box className="row" sx={{
                        display: 'flex',
                        flexDirection: 'row'
                    }}>
                        <Box className="rowLeft" sx={{
                            width: '30%',
                            display: 'flex',
                            justifyContent: 'end'
                        }}>
                            <Typography sx={{
                                display: 'flex',
                                alignItems: 'center',
                                fontSize: '25px',
                                fontWeight: 'bold',
                                height: '40px',
                                color: '#999',
                            }}>
                                Username:
                            </Typography>
                        </Box>
                        <Box className="rowRight" sx={{
                            width: '65%'
                        }}>
                            <TextField
                                label='Enter Username'
                                size='small'
                                value={userName}
                                onChange={(e) => { setUserName(e.target.value) }}
                                sx={{
                                    width: '100%',
                                }}
                            />
                        </Box>
                    </Box>

                    <Box className="row" sx={{
                        display: 'flex',
                        flexDirection: 'row'
                    }}>
                        <Box className="rowLeft" sx={{
                            width: '30%',
                            display: 'flex',
                            justifyContent: 'end'
                        }}>
                            <Typography sx={{
                                display: 'flex',
                                alignItems: 'center',
                                fontSize: '25px',
                                fontWeight: 'bold',
                                height: '40px',
                                color: '#999',
                            }}>
                                Password:
                            </Typography>
                        </Box>
                        <Box className="rowRight" sx={{
                            width: '65%'
                        }}>
                            <TextField
                                label='Enter Password'
                                type='password'
                                size='small'
                                value={password}
                                onChange={(e) => { setPassword(e.target.value) }}
                                sx={{
                                    width: '100%',
                                }}
                            />
                        </Box>
                    </Box>

                    <Box className="row" sx={{
                        display: 'flex',
                        flexDirection: 'row'
                    }}>
                        <Box className="rowLeft" sx={{
                            width: '30%',
                            display: 'flex',
                            justifyContent: 'end'
                        }}>
                            <Typography sx={{
                                display: 'flex',
                                alignItems: 'center',
                                fontSize: '25px',
                                fontWeight: 'bold',
                                height: '40px',
                                color: '#999',
                            }}>
                                University:
                            </Typography>
                        </Box>
                        <Box className="rowRight" sx={{
                            width: '65%',
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '20px'
                        }}>
                            <TextField
                                label='Select University'
                                size='small'
                                select
                                sx={{
                                    width: '100%',
                                }}
                            >
                                {universCode.map((option) => (
                                    <MenuItem
                                        key={option.univerCode}
                                        value={option.univerCode}
                                        onClick={() => {
                                            setUniverCode({
                                                code: option.univerCode,
                                                name: option.univerName
                                            })
                                        }}
                                    >
                                        {option.univerName}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Box>
                    </Box>

                    <Box className="row" sx={{
                        display: 'flex',
                        flexDirection: 'row'
                    }}>
                        <Box className="rowLeft" sx={{
                            width: '30%',
                            display: 'flex',
                            justifyContent: 'end'
                        }}>
                            <Typography sx={{
                                display: 'flex',
                                alignItems: 'center',
                                fontSize: '25px',
                                fontWeight: 'bold',
                                height: '40px',
                                color: '#999',
                            }}>
                                Faculty:
                            </Typography>
                        </Box>
                        <Box className="rowRight" sx={{
                            width: '65%',
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '20px'
                        }}>
                            <TextField
                                label='Select Faculty'
                                size='small'
                                select
                                sx={{
                                    width: '100%',
                                }}
                            >
                                {facultiesCode?.map((option) => (
                                    <MenuItem
                                        key={option.facultyCode}
                                        value={option.facultyCode}
                                        onClick={() => {
                                            setFacultyCode({
                                                code: option.facultyCode,
                                                name: option.facultyName
                                            })
                                        }}
                                    >
                                        {option.facultyName}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Box>
                    </Box>

                    <Box className="row" sx={{
                        display: 'flex',
                        flexDirection: 'row'
                    }}>
                        <Box className="rowLeft" sx={{
                            width: '30%',
                            display: 'flex',
                            justifyContent: 'end'
                        }}>
                            <Typography sx={{
                                display: 'flex',
                                alignItems: 'center',
                                fontSize: '25px',
                                fontWeight: 'bold',
                                height: '40px',
                                color: '#999',
                            }}>
                                Student Class:
                            </Typography>
                        </Box>
                        <Box className="rowRight" sx={{
                            width: '65%'
                        }}>
                            <TextField
                                label='Enter Student Class'
                                size='small'
                                value={studentClass}
                                onChange={(e) => { setStudentClass(e.target.value) }}
                                sx={{
                                    width: '100%',
                                }}
                            />
                        </Box>
                    </Box>

                    <Box className="row" sx={{
                        display: 'flex',
                        flexDirection: 'row'
                    }}>
                        <Box className="rowLeft" sx={{
                            width: '30%',
                            display: 'flex',
                            justifyContent: 'end'
                        }}>
                            <Typography sx={{
                                display: 'flex',
                                alignItems: 'center',
                                fontSize: '25px',
                                fontWeight: 'bold',
                                height: '40px',
                                color: '#999',
                            }}>
                                Student Full Name:
                            </Typography>
                        </Box>
                        <Box className="rowRight" sx={{
                            width: '65%'
                        }}>
                            <TextField
                                label='Enter Student Full Name'
                                size='small'
                                value={studentFullname}
                                onChange={(e) => { setStudentFullname(e.target.value) }}
                                sx={{
                                    width: '100%',
                                }}
                            />
                        </Box>
                    </Box>

                    <Box className="row" sx={{
                        display: 'flex',
                        flexDirection: 'row'
                    }}>
                        <Box className="rowLeft" sx={{
                            width: '30%',
                            display: 'flex',
                            justifyContent: 'end'
                        }}>
                            <Typography sx={{
                                display: 'flex',
                                alignItems: 'center',
                                fontSize: '25px',
                                fontWeight: 'bold',
                                height: '40px',
                                color: '#999',
                            }}>
                                Student Code:
                            </Typography>
                        </Box>
                        <Box className="rowRight" sx={{
                            width: '65%'
                        }}>
                            <TextField
                                label='Enter Student Code'
                                size='small'
                                value={studentCode}
                                onChange={(e) => { setStudentCode(e.target.value) }}
                                sx={{
                                    width: '100%',
                                }}
                            />
                        </Box>
                    </Box>

                    <Box className="row" sx={{
                        display: 'flex',
                        flexDirection: 'row'
                    }}>
                        <Box className="rowLeft" sx={{
                            width: '30%',
                            display: 'flex',
                            justifyContent: 'end'
                        }}>
                            <Typography sx={{
                                display: 'flex',
                                alignItems: 'center',
                                fontSize: '25px',
                                fontWeight: 'bold',
                                height: '40px',
                                color: '#999',
                            }}>
                                Student Sex:
                            </Typography>
                        </Box>
                        <Box className="rowRight" sx={{
                            width: '65%'
                        }}>
                            <TextField
                                id="outlined-select-currency"
                                select
                                label='Select Sex'
                                size='small'
                                defaultValue="1"
                                sx={{ width: '100%' }}
                                onChange={(e) => {
                                    setStudentSex(e.target.value);
                                }}
                            >
                                {sex.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Box>
                    </Box>

                    <Box className="row" sx={{
                        display: 'flex',
                        flexDirection: 'row'
                    }}>
                        <Box className="rowLeft" sx={{
                            width: '30%',
                            display: 'flex',
                            justifyContent: 'end'
                        }}>
                            <Typography sx={{
                                display: 'flex',
                                alignItems: 'center',
                                fontSize: '25px',
                                fontWeight: 'bold',
                                height: '40px',
                                color: '#999',
                            }}>
                                Student Birthday:
                            </Typography>
                        </Box>
                        <Box className="rowRight" sx={{
                            width: '65%'
                        }}>
                            <TextField
                                type='date'
                                size='small'
                                label='Select Date'
                                value={studentBirthday}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                sx={{
                                    width: '100%'
                                }}
                                onChange={(e) => {
                                    setStudentBirthday(e.target.value);
                                }}
                            />
                        </Box>
                    </Box>

                    <Box className="row" sx={{
                        display: 'flex',
                        flexDirection: 'row'
                    }}>
                        <Box className="rowLeft" sx={{
                            width: '30%',
                            display: 'flex',
                            justifyContent: 'end'
                        }}>
                            <Typography sx={{
                                display: 'flex',
                                alignItems: 'center',
                                fontSize: '25px',
                                fontWeight: 'bold',
                                height: '40px',
                                color: '#999',
                            }}>
                                Student Email:
                            </Typography>
                        </Box>
                        <Box className="rowRight" sx={{
                            width: '65%'
                        }}>
                            <TextField
                                label='Enter Mentor Email'
                                type='email'
                                size='small'
                                value={studentEmail}
                                onChange={(e) => { setStudentEmail(e.target.value) }}
                                sx={{
                                    width: '100%',
                                }}
                            />
                        </Box>
                    </Box>

                    <Box className="row" sx={{
                        display: 'flex',
                        flexDirection: 'row'
                    }}>
                        <Box className="rowLeft" sx={{
                            width: '30%',
                            display: 'flex',
                            justifyContent: 'end'
                        }}>
                            <Typography sx={{
                                display: 'flex',
                                alignItems: 'center',
                                fontSize: '25px',
                                fontWeight: 'bold',
                                height: '40px',
                                color: '#999',
                            }}>
                                Student Phone:
                            </Typography>
                        </Box>
                        <Box className="rowRight" sx={{
                            width: '65%'
                        }}>
                            <TextField
                                label='Enter Mentor Phone'
                                size='small'
                                type='number'
                                value={studentPhone}
                                onChange={(e) => { setStudentPhone(e.target.value) }}
                                sx={{
                                    width: '100%',
                                }}
                            />
                        </Box>
                    </Box>

                    <Box className="row" sx={{
                        display: 'flex',
                        flexDirection: 'row'
                    }}>
                        <Box className="rowLeft" sx={{
                            width: '30%',
                            display: 'flex',
                            justifyContent: 'end'
                        }}>
                            <Typography sx={{
                                display: 'flex',
                                alignItems: 'center',
                                fontSize: '25px',
                                fontWeight: 'bold',
                                height: '40px',
                                color: '#999',
                            }}>
                                Province:
                            </Typography>
                        </Box>
                        <Box className="rowRight" sx={{
                            width: '65%'
                        }}>
                            <TextField
                                label='Select Province'
                                size='small'
                                select
                                sx={{
                                    width: '100%',
                                }}
                            >
                                {provinces.map((option) => (
                                    <MenuItem
                                        key={option.code}
                                        value={option.code}
                                        onClick={() => {
                                            setProvince({
                                                code: option.code,
                                                name: option.name_with_type
                                            })
                                        }}
                                    >
                                        {option.name_with_type}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Box>
                    </Box>
                    <Box className="row" sx={{
                        display: 'flex',
                        flexDirection: 'row'
                    }}>
                        <Box className="rowLeft" sx={{
                            width: '30%',
                            display: 'flex',
                            justifyContent: 'end'
                        }}>
                            <Typography sx={{
                                display: 'flex',
                                alignItems: 'center',
                                fontSize: '25px',
                                fontWeight: 'bold',
                                height: '40px',
                                color: '#999',
                            }}>
                                District:
                            </Typography>
                        </Box>
                        <Box className="rowRight" sx={{
                            width: '65%'
                        }}>
                            <TextField
                                label='Select District'
                                size='small'
                                select
                                sx={{
                                    width: '100%',
                                }}
                            >
                                {districts.map((option) => (
                                    <MenuItem
                                        key={option.code}
                                        value={option.code}
                                        onClick={() => {
                                            setDistrict({
                                                code: option.code,
                                                name: option.name_with_type
                                            })
                                        }}
                                    >
                                        {option.name_with_type}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Box>
                    </Box>

                    <Box className="row" sx={{
                        display: 'flex',
                        flexDirection: 'row'
                    }}>
                        <Box className="rowLeft" sx={{
                            width: '30%',
                            display: 'flex',
                            justifyContent: 'end'
                        }}>
                            <Typography sx={{
                                display: 'flex',
                                alignItems: 'center',
                                fontSize: '25px',
                                fontWeight: 'bold',
                                height: '40px',
                                color: '#999',
                            }}>
                                Ward:
                            </Typography>
                        </Box>
                        <Box className="rowRight" sx={{
                            width: '65%'
                        }}>
                            <TextField
                                label='Select Ward'
                                size='small'
                                select
                                sx={{
                                    width: '100%',
                                }}
                            >
                                {wards.map((option) => (
                                    <MenuItem
                                        key={option.code}
                                        value={option.code}
                                        onClick={() => {
                                            setWard({
                                                code: option.code,
                                                name: option.name_with_type
                                            })
                                        }}
                                    >
                                        {option.name_with_type}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Box>
                    </Box>

                    <Box className="row" sx={{
                        display: 'flex',
                        flexDirection: 'row'
                    }}>
                        <Box className="rowLeft" sx={{
                            width: '30%',
                            display: 'flex',
                            justifyContent: 'end'
                        }}>
                            <Typography sx={{
                                display: 'flex',
                                alignItems: 'center',
                                fontSize: '25px',
                                fontWeight: 'bold',
                                height: '40px',
                                color: '#999',
                            }}>
                                Address:
                            </Typography>
                        </Box>
                        <Box className="rowRight" sx={{
                            width: '65%'
                        }}>
                            <TextField
                                label='Enter Address'
                                size='small'
                                onChange={(e) => { setAddress(e.target.value) }}
                                sx={{
                                    width: '100%',
                                }}
                            />
                        </Box>
                    </Box>

                </Box>
                <Box className="containerTopRight" sx={{
                    // background: 'red',
                    // width: "150px",
                    // height: "150px",
                    // border: "5px solid #D82C2C",
                    // alignItems: "center",
                }}>
                    {/* <label htmlFor="upload-file">
                  <IconButton
                    component="span"
                    aria-label="upload-picture"
                    sx={{
                      width: "100%",
                      // height: "100px",
                    }}
                  >
                    <img src={selectedFile ? selectedFile?.preview : `http://localhost:2109/info/avatar/${information.accountId}_univer`} width={'100%'} alt="" />
                  </IconButton>
                </label>
                <Input
                  id="upload-file"
                  type="file"
                  sx={{ display: "none" }}
                  onChange={handleFileChange}
                /> */}
                </Box>
            </Box>
            <Box className="containerBottom" sx={{
                width: '90%',
                // background: 'red'
                display: 'flex',
                justifyContent: 'end'
            }}>
                <Button className='addAccountFaculty'
                    onClick={checkTextField}
                    sx={{
                        border: '2px solid #D82C2C',
                        width: '200',
                        height: '50px',
                        color: '#D82C2C',
                        borderRadius: '20px',
                        padding: '10px',
                        '&:hover': {
                            backgroundColor: '#D82C2C',
                            color: '#FFF',
                        },
                    }}>
                    Add Univer
                </Button>
            </Box>
            <Dialog
                open={openDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" sx={{ color: '#D82C2C', fontWeight: 'bold', fontSize: '20px' }}>
                    {"Read the information carefully before adding an account!"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Box className="dialogContain" sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px'
                        }}>

                            <Typography>Username: {userName}</Typography>
                            <Typography>Password: {password}</Typography>
                            <Typography>University: {univerCode?.name + ' (' + univerCode?.code + ')'}</Typography>
                            <Typography>Faculty: {facultyCode?.name + ' (' + facultyCode?.code + ')'}</Typography>
                            <Typography>Student Class: {studentClass}</Typography>
                            <Typography>Student Full Name: {studentFullname}</Typography>
                            <Typography>Student Code: {studentCode}</Typography>
                            <Typography>Sex: {(studentSex === '1') ? 'Male' : 'Female'}</Typography>
                            <Typography>Birthday: {studentBirthday}</Typography>
                            <Typography>Student Email: {studentEmail}</Typography>
                            <Typography>Student Phone: {studentPhone}</Typography>
                            <Typography>Address: {studentAddress}</Typography>
                        </Box>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Disagree</Button>
                    <Button autoFocus onClick={onAddAccount}>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={isCheckAlert} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert variant="filled" severity={alertType}>{message}</Alert>
            </Snackbar>
        </Box>
    )
}

export default AddAccountStudent