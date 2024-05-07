import { Outlet, NavLink, useLocation } from "react-router-dom";
import { Button, Box, Typography } from "@mui/material";
import ComboBox2 from '../Search/ComboBox2';
import ListProject from '../ListProject/ListProject';

const ListProjects = () => {
    return (
        <div>
            <Box className="Container" sx={{
                width: '100%',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <Box className="Title" sx={{
                    width: '85%',
                    height: '120px',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'end',
                    justifyContent: 'space-between'
                }}>
                    <Typography sx={{
                        fontSize: '30px',
                        fontWeight: 'bold',
                        color: '#D82C2C'
                    }}>Khoa Công Nghệ Phần Mềm</Typography>
                    <ComboBox2></ComboBox2>
                </Box>
                <Box className="list_Projects" sx={{
                    marginTop:'70px',
                    width:'80%',
                    height:'500px',
                }}>
                    <ListProject></ListProject>
                </Box>
            </Box>
        </div>
    )
}

export default ListProjects;
