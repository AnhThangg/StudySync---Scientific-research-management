import { React, useState, useEffect, usenavigate } from 'react'
import { Outlet, NavLink, useLocation } from "react-router-dom";
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
import { DataGrid } from '@mui/x-data-grid';
import { getListProposeIdea } from '../../../api/proposeIdeaApi';
import { useNavigate } from "react-router-dom";

const ProposeIdeaStudent = () => {
    const navigate = useNavigate();
    const [listProposeIdea, setListProposeIdea] = useState([]);

    useEffect(() => {
        getListProposeIdea()
            .then((data) => {
                setListProposeIdea(data)
            })
            .catch(e => {
                console.log(e)
            })
    }, [])

    const columns = [
        { field: 'id', headerName: 'No.', width: 80 },
        { field: 'ideaName', headerName: 'Idea Name', width: 220 },
        { field: 'mentorFullname', headerName: 'Mentor', width: 370 },
    ];

    const rows = listProposeIdea.map((item, index) => {
        return {
            id: index+1,
            ideaName: item.ideaName,
            mentorFullname: item.mentorFullname,
            ideaCode: item.ideaCode
        }
    })

    return (
        <Box className="container" sx={{ margin: "50px 0 0 50px" }}>
            <Typography
                variant="h4"
                sx={{
                    color: "#D82C2C",
                    fontWeight: "bold",
                }}>
                Propose Idea
            </Typography>
            <Box className="tableIdea" sx={{
                width: '95%',
                background: '#F6E8E8',
                borderRadius: '20px',
                marginTop: '50px',
                marginBottom: '50px',
            }}>
                <DataGrid
                    autoHeight
                    rows={rows}
                    onCellClick={(e) => (navigate(`/student/proposeidea/${e.row.ideaCode}`))}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10, 15, 20]}
                    sx={{
                        border: 'none',
                        '& .MuiDataGrid-container--top [role=row]': {
                            background: "#D82C2C",
                            fontWeight: 'bold'
                        },
                        '& .MuiDataGrid-columnHeaderTitle': {
                            fontWeight: 'bold',
                            color: '#fff',
                            fontSize: '30px',
                        },
                        '& .MuiDataGrid-row': {
                            fontSize: '25px',
                            color: '#707070',
                            '&:hover': {
                                cursor: 'pointer',
                            },
                        },
                        '& .css-1essi2g-MuiDataGrid-columnHeaderRow': {
                            borderTopLeftRadius: '20px',
                            borderTopRightRadius: '20px',
                        }
                    }}
                />
            </Box>
        </Box>
    )
}

export default ProposeIdeaStudent