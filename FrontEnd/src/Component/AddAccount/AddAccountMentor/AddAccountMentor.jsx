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


const AddAccountMentor = () => {
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
  const [mentorCode, setMentorCode] = useState('');
  const [mentorFullname, setMentorFullname] = useState('');
  const [mentorSex, setMentorSex] = useState('1');
  const [mentorBirthday, setMentorBirthday] = useState('');
  const [mentorPhone, setMentorPhone] = useState('');
  const [mentorEmail, setMentorEmail] = useState('');
  const [mentorDegree, setMentorDegree] = useState('');
  const [mentorScientificName, setMentorScientificName] = useState('');
  const [mentorAddress, setMentorAddress] = useState('');
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
    (!validPhoneNumber(mentorPhone)) && setMessage('Invalid Phone Number');
    (!mentorPhone) && setMessage('Please fill in information in Mentor Phone');
    (!validateEmail(mentorEmail)) && setMessage('Invalid email');
    (!mentorEmail) && setMessage('Please fill in information in Mentor Email');
    (!mentorScientificName) && setMessage('Please fill in information in Mentor Scientific Name');
    (!mentorDegree) && setMessage('Please fill in information in Mentor Scientific Name');
    (!mentorBirthday) && setMessage('Please fill in information in Mentor Birthday');
    (!mentorCode) && setMessage('Please fill in information in Mentor Code');
    (!mentorFullname) && setMessage('Please fill in information in Mentor Name');
    (facultyCode.length === 0) && setMessage('Please fill in information in Faculty');
    (univerCode.length === 0) && setMessage('Please fill in information in University');
    (!password) && setMessage('Please fill in information in Password');
    (!userName) && setMessage('Please fill in information in Username');
    if (!univerCode || !facultyCode || !address || !ward || !district || !province || !mentorPhone || !mentorEmail || !mentorScientificName || !mentorDegree || !mentorBirthday || !mentorCode || !mentorFullname || !password || !userName || !validateEmail(mentorEmail) || !validPhoneNumber(mentorPhone) || !mentorSex) {
      setAlertType('error');
      setIsCheckAlert(true);
      setTimeout(() => {
        setIsCheckAlert(false);
      }, 4000)
    } else {
      setMentorAddress(address + ', ' + ward.name + ', ' + district.name + ', ' + province.name)
      setOpenDialog(true);
    }
  }
  console.log(mentorSex);
  const onAddAccount = async () => {
    const res = await createAccount('mentor', {
      userName,
      password,
      mentorCode,
      mentorFullname,
      mentorSex,
      mentorBirthday,
      mentorEmail,
      mentorPhone,
      mentorDegree,
      mentorScientificName,
      mentorAddress,
      facultyCode: facultyCode.code
    })
    if (res.status === 200) {
      setOpenDialog(false);
      setAlertType('success');
      setMessage(res.data);
      setUserName('');
      setPassword('');
      setMentorFullname('');
      setMentorCode('');
      setMentorSex('');
      setMentorBirthday('');
      setMentorDegree('');
      setMentorScientificName('');
      setMentorEmail('');
      setMentorPhone('');
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
                Mentor Name:
              </Typography>
            </Box>
            <Box className="rowRight" sx={{
              width: '65%'
            }}>
              <TextField
                label='Enter Mentor Name'
                size='small'
                value={mentorFullname}
                onChange={(e) => { setMentorFullname(e.target.value) }}
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
                Mentor Code:
              </Typography>
            </Box>
            <Box className="rowRight" sx={{
              width: '65%'
            }}>
              <TextField
                label='Enter Mentor Code'
                size='small'
                value={mentorCode}
                onChange={(e) => { setMentorCode(e.target.value) }}
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
                Mentor Sex:
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
                  setMentorSex(e.target.value);
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
                Mentor Birthday:
              </Typography>
            </Box>
            <Box className="rowRight" sx={{
              width: '65%'
            }}>
              <TextField
                type='date'
                size='small'
                label='Select Date'
                value={mentorBirthday}
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{
                  width: '100%'
                }}
                onChange={(e) => {
                  setMentorBirthday(e.target.value);
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
                Mentor Degree:
              </Typography>
            </Box>
            <Box className="rowRight" sx={{
              width: '65%'
            }}>
              <TextField
                label='Enter Mentor Degree'
                size='small'
                value={mentorDegree}
                onChange={(e) => { setMentorDegree(e.target.value) }}
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
                Mentor ScientificName:
              </Typography>
            </Box>
            <Box className="rowRight" sx={{
              width: '65%'
            }}>
              <TextField
                label='Enter ScientificName'
                size='small'
                value={mentorScientificName}
                onChange={(e) => { setMentorScientificName(e.target.value) }}
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
                Mentor Email:
              </Typography>
            </Box>
            <Box className="rowRight" sx={{
              width: '65%'
            }}>
              <TextField
                label='Enter Mentor Email'
                type='email'
                size='small'
                value={mentorEmail}
                onChange={(e) => { setMentorEmail(e.target.value) }}
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
                Mentor Phone:
              </Typography>
            </Box>
            <Box className="rowRight" sx={{
              width: '65%'
            }}>
              <TextField
                label='Enter Mentor Phone'
                size='small'
                type='number'
                value={mentorPhone}
                onChange={(e) => { setMentorPhone(e.target.value) }}
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
              {/* userName */}
              <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: '10px',
              }}>
                <Typography sx={{ fontWeight: 'bold', color: '#1e385d' }}>Username: </Typography>
                <Typography sx={{ fontWeight: 'bold', color: '#718199' }}>{userName}</Typography>
              </Box>

              {/* password */}
              <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: '10px',
              }}>
                <Typography sx={{ fontWeight: 'bold', color: '#1e385d' }}>Password: </Typography>
                <Typography sx={{ fontWeight: 'bold', color: '#718199' }}>{password}</Typography>
              </Box>

              {/* University */}
              <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: '10px',
              }}>
                <Typography sx={{ fontWeight: 'bold', color: '#1e385d' }}>University: </Typography>
                <Typography sx={{ fontWeight: 'bold', color: '#718199' }}>{univerCode?.name + ' (' + univerCode?.code + ')'}</Typography>
              </Box>

              {/* Faculty */}
              <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: '10px',
              }}>
                <Typography sx={{ fontWeight: 'bold', color: '#1e385d' }}>Faculty: </Typography>
                <Typography sx={{ fontWeight: 'bold', color: '#718199' }}>{facultyCode?.name + ' (' + facultyCode?.code + ')'}</Typography>
              </Box>

              {/* Mentor Name */}
              <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: '10px',
              }}>
                <Typography sx={{ fontWeight: 'bold', color: '#1e385d' }}>Mentor Name: </Typography>
                <Typography sx={{ fontWeight: 'bold', color: '#718199' }}>{mentorFullname}</Typography>
              </Box>

              {/* Mentor Code */}
              <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: '10px',
              }}>
                <Typography sx={{ fontWeight: 'bold', color: '#1e385d' }}>Mentor Code: </Typography>
                <Typography sx={{ fontWeight: 'bold', color: '#718199' }}>{mentorCode}</Typography>
              </Box>

              {/* Sex */}
              <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: '10px',
              }}>
                <Typography sx={{ fontWeight: 'bold', color: '#1e385d' }}>Sex: </Typography>
                <Typography sx={{ fontWeight: 'bold', color: '#718199' }}>{(mentorSex === '1') ? 'Female' : 'Male'}</Typography>
              </Box>

              {/* Birthday */}
              <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: '10px',
              }}>
                <Typography sx={{ fontWeight: 'bold', color: '#1e385d' }}>Birthday: </Typography>
                <Typography sx={{ fontWeight: 'bold', color: '#718199' }}>{mentorBirthday}</Typography>
              </Box>

              {/* Mentor Degree */}
              <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: '10px',
              }}>
                <Typography sx={{ fontWeight: 'bold', color: '#1e385d' }}>Mentor Degree: </Typography>
                <Typography sx={{ fontWeight: 'bold', color: '#718199' }}>{mentorDegree}</Typography>
              </Box>

              {/* Mentor Scientific Name */}
              <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: '10px',
              }}>
                <Typography sx={{ fontWeight: 'bold', color: '#1e385d' }}>Mentor Scientific Name: </Typography>
                <Typography sx={{ fontWeight: 'bold', color: '#718199' }}>{mentorScientificName}</Typography>
              </Box>

              {/* Mentor Email */}
              <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: '10px',
              }}>
                <Typography sx={{ fontWeight: 'bold', color: '#1e385d' }}>Mentor Email: </Typography>
                <Typography sx={{ fontWeight: 'bold', color: '#718199' }}>{mentorEmail}</Typography>
              </Box>

              {/* Mentor Phone */}
              <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: '10px',
              }}>
                <Typography sx={{ fontWeight: 'bold', color: '#1e385d' }}>Mentor Phone: </Typography>
                <Typography sx={{ fontWeight: 'bold', color: '#718199' }}>{mentorPhone}</Typography>
              </Box>

              {/* Address */}
              <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: '10px',
              }}>
                <Typography sx={{ fontWeight: 'bold', color: '#1e385d' }}>Address: </Typography>
                <Typography sx={{ fontWeight: 'bold', color: '#718199' }}>{mentorAddress}</Typography>
              </Box>
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

export default AddAccountMentor