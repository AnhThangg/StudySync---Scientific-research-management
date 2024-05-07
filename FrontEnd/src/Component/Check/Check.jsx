import React, { useEffect, useState } from 'react';
import { Outlet, NavLink, useLocation, useNavigate, } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
  Stack
} from '@mui/material';
import 'animate.css';
import logoDTU from '../../assets/Logo-DuyTan.png';
import imgLogin from '../../assets/imageLogin.png';
import { login } from '../../api/authApi';
import { getRole } from '../../api/personalApi';
import './check.scss'

const Check = () => {

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isCheckAlert, setIsCheckAlert] = useState(false);
  const navigate = useNavigate();

  const checkRole = async () => {
    const role = await getRole();
    return role;
  }
  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      checkRole()
        .then(role => {
          if (role === 'admin') {
            navigate('/admin/homepage')
          } else if (role === 'univer') {
            navigate('/univer/dashboard/faculty')
          } else if (role === 'faculty') {
            navigate('/faculty/mentor')
          } else if (role === 'mentor') {
            navigate('/mentor/mentorhomepage/mentorproject')
          } else if (role === 'student') {
            navigate('/student/project')
          }
        })
        .catch(e => {
          console.log(e);
        })
    }
  }, []);
  const onLogin = async () => {
    const res = await login({
      userName,
      password
    });
    if (res.status === 200) {
      localStorage.setItem('accessToken', JSON.stringify(res.data.accessToken));
      if (res.data.role === 'admin') {
        navigate('/admin/homepage')
      } else if (res.data.role === 'univer') {
        navigate('/univer/dashboard/faculty')
      } else if (res.data.role === 'faculty') {
        navigate('/faculty/mentor')
      } else if (res.data.role === 'mentor') {
        navigate('/mentor/mentorhomepage/mentorproject')
      } else if (res.data.role === 'student') {
        navigate('/student/project')
      }
    } else {
      setMessage('Wrong Username or Password');
      (!userName && password) && setMessage('Please fill in your Username');
      (userName && !password) && setMessage('Please fill in your Password');
      (!userName && !password) && setMessage('Please fill in your Username and Password');
      setIsCheckAlert(true);
      setTimeout(() => {
        setIsCheckAlert(false);
      }, 4000)
    }

  }
  return (
    <Box className="contain" sx={{
      height: '100vh',
      width: '100%',
      background: '#F6E6E6',
      background: 'linear-gradient(#FFC5C5,#F6E6E6)',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Box className="loginForm" sx={{
        height: '70vh',
        width: '80%',
        background: '#fff',
        boxShadow: '0 7px 25px rgb(0 0 0 / 29%)',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'row',
      }}>
        <Box className="leftForm" sx={{
          width: '45%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}>
          <Box className="loginFormLogo" sx={{
            width: '100%',
            height: 'auto',
            padding: '10px',
            borderBottom: '1.7px solid #ccc'
          }}>
            <img
              src={logoDTU}
              alt="Duy Tan University"
              height="77px" />
          </Box>
          <Box className="loginFormBox" sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '30px',
            gap: '10px'
          }}>
            <Box className="loginFormInfo" sx={{
              width: '70%',
              display: 'flex',
              flexDirection: 'column',
              gap: '25px'
            }}>
              <Box className='loginFormInfoTitle' sx={{
                paddingTop: '40px',
              }}>
                <Typography sx={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: '#D82C2C'
                }}>Let’s Get Started!</Typography>
                <Typography sx={{
                  fontSize: '13px',
                  fontWeight: 'bold',
                  color: '#999'
                }}>Please fill the below details to login your account.</Typography>
              </Box>
              <Box className="loginFormInfoContain" sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
              }}>
                <Box className="loginFormInfoUsername" sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '7px'
                }}>
                  <Typography sx={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: '#999'
                  }}>Username</Typography>
                  <Box className="textFieldAndWarning" sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '10px',
                  }}>

                  </Box>
                  <TextField
                    label='Enter username'
                    type='text'
                    size='small'
                    onChange={(e) => setUserName(e.target.value)}
                    sx={{
                      width: '80%'
                    }}
                  />
                </Box>
                <Box className="loginFormInfoPassword" sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '5px'
                }}>
                  <Typography sx={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: '#999'
                  }}>Pasword</Typography>
                  <TextField
                    label='Enter password'
                    type='password'
                    size='small'
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{
                      width: '80%'
                    }}
                  />
                </Box>
              </Box>
            </Box>
            <Button
              className='btnLogin'
              onClick={onLogin}
              sx={{
                width: '30%',
                height: '40px',
                background: '#D82C2C',
                color: '#fff',
                marginTop: '28px',
                border: '1px solid #D82C2C ',
                '&:hover': {
                  background: '#fff',
                  color: '#D82C2C',
                  boxShadow: '0 0 5px #FFC5C5, 0 0 25px #FFC5C5, 0 0 50px #FFC5C5, 0 0 100px #FFC5C5'
                }
              }}>
              Login
            </Button>
          </Box>
        </Box>
        <Box className="rightForm" sx={{
          width: '55%',
          height: '100%',
          background: '#fcf6f6',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'end',
          borderRadius: '0 10px 10px 0'
        }}>
          <img width='90%' src={imgLogin} alt='Study-Sync' />
        </Box>
      </Box>

      <Snackbar open={isCheckAlert} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert variant="outlined" severity="error">{message}</Alert>
      </Snackbar>
    </Box>
  )
}

export default Check