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
import { Phone } from '@mui/icons-material';
import { createAccount } from '../../../api/adminApi';

const AddAccountUniver = () => {

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [province, setProvince] = useState();
  const [district, setDistrict] = useState();
  const [ward, setWard] = useState();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [univerName, setUniverName] = useState('');
  const [univerCode, setUniverCode] = useState('');
  const [univerPhone, setUniverPhone] = useState('');
  const [univerEmail, setUniverEmail] = useState('');
  const [address, setAddress] = useState('');
  const [univerAddress, setUniverAddress] = useState('');
  const [message, setMessage] = useState('');
  const [isCheckAlert, setIsCheckAlert] = useState(false);
  const [alertType, setAlertType] = useState('error');
  const [openDialog, setOpenDialog] = useState(false);
  const [key, setKey] = useState(0);
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
  const checkTextField = () => {
    setMessage('Please fill in information in Address');
    (!address) && setMessage('Please fill in information in Address');
    (!ward) && setMessage('Please fill in information in Ward');
    (!district) && setMessage('Please fill in information in District');
    (!province) && setMessage('Please fill in information in Province');
    (!univerPhone) && setMessage('Please fill in information in Univer Phone');
    (!univerEmail) && setMessage('Please fill in information in Univer Email');
    (!univerCode) && setMessage('Please fill in information in Univer Code');
    (!univerName) && setMessage('Please fill in information in University Name');
    (!password) && setMessage('Please fill in information in Password');
    (!userName) && setMessage('Please fill in information in Username');
    if (!address || !ward || !district || !province || !univerPhone || !univerEmail || !univerCode || !univerName || !password || !userName) {
      setAlertType('error');
      setIsCheckAlert(true);
      setTimeout(() => {
        setIsCheckAlert(false);
      }, 4000)
    } else {
      setUniverAddress(address + ', ' + ward.name + ', ' + district.name + ', ' + province.name)
      setOpenDialog(true);
    }
  }
  const onAddAccount = async () => {
    const res = await createAccount('univer', {
      userName,
      password,
      univerCode,
      univerName,
      univerPhone,
      univerEmail,
      univerAddress
    })
    if (res.status === 200) {
      setOpenDialog(false);
      setAlertType('success');
      setMessage(res.data);
      setUserName('');
      setPassword('');
      setUniverName('');
      setUniverCode('');
      setUniverEmail('');
      setUniverPhone('');
      setProvince(undefined);
      setDistrict(undefined);
      setWard(undefined);
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
                University Name:
              </Typography>
            </Box>
            <Box className="rowRight" sx={{
              width: '65%'
            }}>
              <TextField
                label='Enter University Name'
                size='small'
                value={univerName}
                onChange={(e) => { setUniverName(e.target.value) }}
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
                Univer Code:
              </Typography>
            </Box>
            <Box className="rowRight" sx={{
              width: '65%'
            }}>
              <TextField
                label='Enter Univer Code'
                size='small'
                value={univerCode}
                onChange={(e) => { setUniverCode(e.target.value) }}
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
                Univer Email:
              </Typography>
            </Box>
            <Box className="rowRight" sx={{
              width: '65%'
            }}>
              <TextField
                label='Enter Univer Email'
                type='email'
                size='small'
                value={univerEmail}
                onChange={(e) => { setUniverEmail(e.target.value) }}
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
                Univer Phone:
              </Typography>
            </Box>
            <Box className="rowRight" sx={{
              width: '65%'
            }}>
              <TextField
                label='Enter Univer Phone'
                size='small'
                value={univerPhone}
                onChange={(e) => { setUniverPhone(e.target.value) }}
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
        <Button className='addAccountUniver'
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
        // onClose=''
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
                flexDirection: 'row'
              }}>
                <Typography sx={{ fontWeight: 'bold', color: '#1e385d' }}>Username: </Typography>
                <Typography sx={{ marginLeft: '10px', fontWeight: 'bold', color: '#718199' }}>{userName}</Typography>
              </Box>
              
              {/* password */}
              <Box sx={{
                display: 'flex',
                flexDirection: 'row'
              }}>
                <Typography sx={{ fontWeight: 'bold', color: '#1e385d' }}>Password: </Typography>
                <Typography sx={{ marginLeft: '10px', fontWeight: 'bold', color: '#718199' }}>{password}</Typography>
              </Box>

              {/* University Name */}
              <Box sx={{
                display: 'flex',
                flexDirection: 'row'
              }}>
                <Typography sx={{ fontWeight: 'bold', color: '#1e385d' }}>University Name: </Typography>
                <Typography sx={{ marginLeft: '10px', fontWeight: 'bold', color: '#718199' }}>{univerName}</Typography>
              </Box>
              {/* University Code */}
              <Box sx={{
                display: 'flex',
                flexDirection: 'row'
              }}>
                <Typography sx={{ fontWeight: 'bold', color: '#1e385d' }}>Univer Code: </Typography>
                <Typography sx={{ marginLeft: '10px', fontWeight: 'bold', color: '#718199' }}>{univerCode}</Typography>
              </Box>

              {/* University Email */}
              <Box sx={{
                display: 'flex',
                flexDirection: 'row'
              }}>
                <Typography sx={{ fontWeight: 'bold', color: '#1e385d' }}>Univer Email: </Typography>
                <Typography sx={{ marginLeft: '10px', fontWeight: 'bold', color: '#718199' }}>{univerEmail}</Typography>
              </Box>
              
              {/* University Phone */}
              <Box sx={{
                display: 'flex',
                flexDirection: 'row'
              }}>
                <Typography sx={{ fontWeight: 'bold', color: '#1e385d' }}>Univer Phone: </Typography>
                <Typography sx={{ marginLeft: '10px', fontWeight: 'bold', color: '#718199' }}>{univerPhone}</Typography>
              </Box>

              {/* Address */}
              <Box sx={{
                display: 'flex',
                flexDirection: 'row'
              }}>
                <Typography sx={{ fontWeight: 'bold', color: '#1e385d' }}>Address: </Typography>
                <Typography sx={{ marginLeft: '10px', fontWeight: 'bold', color: '#718199' }}>{univerAddress}</Typography>
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

export default AddAccountUniver