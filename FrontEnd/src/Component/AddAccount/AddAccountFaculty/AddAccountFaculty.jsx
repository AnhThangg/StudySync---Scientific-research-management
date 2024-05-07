import { React, useState, useEffect } from 'react'
import {
  Button,
  Box,
  Typography,
  TextField,
  MenuItem,
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
import { createAccount } from '../../../api/adminApi';

const AddAccountFaculty = () => {
  const [universCode, setUniversCode] = useState([]);
  const [univerCode, setUniverCode] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [province, setProvince] = useState();
  const [district, setDistrict] = useState();
  const [ward, setWard] = useState();
  const [address, setAddress] = useState();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [facultyCode, setFacultyCode] = useState('');
  const [facultyName, setFacultyName] = useState('');
  const [facultyPhone, setFacultyPhone] = useState('');
  const [facultyEmail, setFacultyEmail] = useState('');
  const [facultyAddress, setFacultyAddress] = useState('');
  const [message, setMessage] = useState('');
  const [isCheckAlert, setIsCheckAlert] = useState(false);
  const [alertType, setAlertType] = useState('error');
  const [openDialog, setOpenDialog] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    getAllCodeUniver()
      .then(data => {
        setUniversCode(data)
      })
      .catch(e => {
        console.log(e);
      })
  }, []);

  useEffect(() => {
    getProvinces()
      .then(data => {
        setProvinces(data)
      })
      .catch(e => {
        console.log(e);
      })
  }, []);
  console.log(province);
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
    setMessage('Please fill in information in Address');
    (!address) && setMessage('Please fill in information in Address');
    (!ward) && setMessage('Please fill in information in Ward');
    (!district) && setMessage('Please fill in information in District');
    (!province) && setMessage('Please fill in information in Province');
    (!validPhoneNumber(facultyPhone)) && setMessage('Invalid Phone Number');
    (!facultyPhone) && setMessage('Please fill in information in Faculty Phone');
    (!validateEmail(facultyEmail)) && setMessage('Invalid email');
    (!facultyEmail) && setMessage('Please fill in information in Faculty Email');
    (!facultyCode) && setMessage('Please fill in information in Faculty Code');
    (!facultyName) && setMessage('Please fill in information in Faculty Name');
    (univerCode.length === 0) && setMessage('Please fill in information in University');
    (!password) && setMessage('Please fill in information in Password');
    (!userName) && setMessage('Please fill in information in Username');
    if (!univerCode || !address || !ward || !district || !province || !facultyPhone || !facultyEmail || !facultyCode || !facultyName || !password || !userName || !validateEmail(facultyEmail) || !validPhoneNumber(facultyPhone)) {
      setAlertType('error');
      setIsCheckAlert(true);
      setTimeout(() => {
        setIsCheckAlert(false);
      }, 4000)
    } else {
      setFacultyAddress(address + ', ' + ward.name + ', ' + district.name + ', ' + province.name)
      setOpenDialog(true);
    }
  }

  const onAddAccount = async () => {
    const res = await createAccount('faculty', {
      userName,
      password,
      facultyCode,
      facultyName,
      facultyPhone,
      facultyEmail,
      facultyAddress,
      univerCode: univerCode.code
    })
    if (res.status === 200) {
      setOpenDialog(false);
      setAlertType('success');
      setMessage(res.data);
      setUserName('');
      setPassword('');
      setFacultyName('');
      setFacultyCode('');
      setFacultyEmail('');
      setFacultyPhone('');
      setProvince(undefined);
      setDistrict(undefined);
      setWard(undefined);
      setUniverCode([])
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
    }}>
      <Box key={key} className="containerTop" sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: '5%',
      }}>
        <Box className="containerTopLeft" sx={{
          width: '60%',
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
              width: '65%'
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
                Faculty Name:
              </Typography>
            </Box>
            <Box className="rowRight" sx={{
              width: '65%'
            }}>
              <TextField
                label='Enter Faculty Name'
                size='small'
                value={facultyName}
                onChange={(e) => { setFacultyName(e.target.value) }}
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
                Faculty Code:
              </Typography>
            </Box>
            <Box className="rowRight" sx={{
              width: '65%'
            }}>
              <TextField
                label='Enter Faculty Code'
                size='small'
                value={facultyCode}
                onChange={(e) => { setFacultyCode(e.target.value) }}
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
                Faculty Email:
              </Typography>
            </Box>
            <Box className="rowRight" sx={{
              width: '65%'
            }}>
              <TextField
                label='Enter Faculty Email'
                type='email'
                size='small'
                value={facultyEmail}
                onChange={(e) => { setFacultyEmail(e.target.value) }}
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
                Faculty Phone:
              </Typography>
            </Box>
            <Box className="rowRight" sx={{
              width: '65%'
            }}>
              <TextField
                label='Enter Faculty Phone'
                size='small'
                type='number'
                value={facultyPhone}
                onChange={(e) => { setFacultyPhone(e.target.value) }}
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
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
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
              <Typography>University: {univerCode.name + ' (' + univerCode.code + ')'}</Typography>
              <Typography>Faculty Name: {facultyName}</Typography>
              <Typography>Faculty Code: {facultyCode}</Typography>
              <Typography>Faculty Email: {facultyEmail}</Typography>
              <Typography>Faculty phone: {facultyPhone}</Typography>
              <Typography>Address: {facultyAddress}</Typography>
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

export default AddAccountFaculty