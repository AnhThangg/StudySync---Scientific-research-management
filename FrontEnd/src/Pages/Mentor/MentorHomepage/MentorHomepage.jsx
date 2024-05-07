import {
  Box,
  Icon,
  Typography,
  Input,
  IconButton,
  Button,
} from "@mui/material";
import {React, useEffect} from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { Groups, AccessAlarms } from "@mui/icons-material";
import './MentorHomepage.scss'
// import { FileUpload, RecentActors } from "@mui/icons-material";
const MentorHomepage = () => {

  const { pathname: url } = useLocation();
    useEffect(() => {
        const navLinks = document.getElementsByClassName("homePageContain");
        for (let i = 0; i < navLinks.length; i += 1) {
            if (navLinks[i].classList.contains("active")) {
                navLinks[i].childNodes[0].classList.add("isClick");
            } else {
                navLinks[i].childNodes[0].classList.remove("isClick");
            }
        }
    }, [url]);

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Box className="homePageItems" sx={{
        flex: '1'
      }}>
        <Typography sx={{
          marginLeft: '50px',
          marginTop: '56px',
          fontSize: '30px',
          fontWeight: 'bold',
          color: '#D82C2C'
        }}>
          Homepage
        </Typography>
        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          height: '150px',
          alignItems: 'center',
          justifyContent: 'space-around'
        }}>
          <NavLink to={"/Mentor/MentorHomepage/MentorProject"} className="homePageContain">
            <Box className="customItem" sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              width: '270px',
              height: '130px',
              background: '#FFF',
              borderRadius: '30px',
              border: '1px solid #999',
              transition: 'background 0.3s',
            }}>
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '50%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Typography sx={{
                  fontSize: '40px',
                  color: '#D82C2C',
                  fontWeight: 'bold'
                }}>
                  7
                </Typography>
                <Typography sx={{
                  fontSize: '20px',
                  color: '#999'
                }}>
                  Projects
                </Typography>
              </Box>
              <Box sx={{
                display: 'flex',
                width: '50%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Groups className="customIcon" fontSize="inherit" sx={{ color: "#D82C2C", fontSize : "3rem" }} />
              </Box>
            </Box>
          </NavLink>

          <NavLink to={"/Mentor/MentorHomepage/MentorWaitting"} className="homePageContain">
            <Box className="customItem" sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              width: '270px',
              height: '130px',
              background: '#FFF',
              borderRadius: '30px',
              border: '1px solid #999',
              transition: 'background 0.3s',
            }}>
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '50%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Typography sx={{
                  fontSize: '40px',
                  color: '#D82C2C',
                  fontWeight: 'bold'
                }}>
                  4
                </Typography>
                <Typography sx={{
                  fontSize: '20px',
                  color: '#999'
                }}>
                  Waitting
                </Typography>
              </Box>
              <Box sx={{
                display: 'flex',
                width: '50%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <AccessAlarms className="customIcon" fontSize="inherit" sx={{ color: "#D82C2C", fontSize: "3rem" }} />
              </Box>
            </Box>
          </NavLink>
        </Box>
      </Box>
      <Box sx={{
        flex: '4'
      }}>
        <Outlet />
      </Box>
    </Box>
  )
}

export default MentorHomepage
