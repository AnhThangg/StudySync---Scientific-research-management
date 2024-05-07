import React from 'react'
import { Outlet, NavLink, useLocation } from "react-router-dom";
import { Button, Box, Typography } from "@mui/material";
import "./Dashboar_Detail.scss";
import ComboBox from './Search/ComboBox';
import StickyHeadTable from './ListFaculty/StickyHeadTable';
import ListProject from './ListProject';
import InforProject from './InfoProject/InforProject';



const Dashboard_Detail = () => {
    return (
        <div>
            <Box ClassName="Container" sx={{
                width: '100%',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <Box ClassName="Title" sx={{
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
                    }}>Faculty</Typography>
                    <ComboBox></ComboBox>
                </Box>
                <Box ClassName="list_Faculty" sx={{
                    marginTop:'70px',
                    width:'80%',
                    height:'700px',
                }}>
                    <StickyHeadTable></StickyHeadTable>
                    <ListProject></ListProject>
                    <InforProject></InforProject>
                </Box>
            </Box>
        </div>
    )
}

export default Dashboard_Detail
