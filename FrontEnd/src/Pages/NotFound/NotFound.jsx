import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import not_found from '../../assets/Not_Found.png'

import "./NotFound.scss";
import 'animate.css';
const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '95vh',
      textAlign: 'center',
    }}>
      <Box sx={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}>
        <img className={`error-cover animate__animated animate__tada`} width={'200px'} src={not_found} alt='Not Found' />
        <Typography sx={{
          fontSize: { xs: '20px', sm: '25px' },
          textTransform: 'uppercase',
          fontWeight: '600',
        }} variant='h2'>Page not found</Typography>
      </Box>

      <Typography sx={{
        marginTop: '100px',
        fontSize: { xs: '1rem', sm: '1.1rem' },
        fontWeight: '400',
        cursor: 'pointer'
      }}
        className={`animate__animated animate__pulse animate__infinite`}
        onClick={() => navigate('/')}
        variant='h6'>
        Go back home
      </Typography>
    </Box>
  )
}
//
export default NotFound