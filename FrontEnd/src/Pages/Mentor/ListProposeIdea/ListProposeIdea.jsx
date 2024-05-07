import { React, useState, useEffect } from 'react'
import { Button, Box, Typography } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import { Edit, Delete } from "@mui/icons-material";
import { getListProposeIdea } from '../../../api/proposeIdeaApi';
import { useNavigate } from "react-router-dom";


const ListProposeIdea = () => {
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
        { field: 'id', headerName: 'No.', width: 100 },
        { field: 'ideaName', headerName: 'IdeaName', width: 350 },
        { field: 'mentorFullname', headerName: 'Mentor Fullname', width: 350 },
        { field: 'createdAt', headerName: 'Create At', width: 250 },
        { field: 'updatedAt', headerName: 'Update At', width: 250 },
    ];

    const rows = listProposeIdea.map((item, index) => {
        return {
            id: index + 1,
            ideaName: item.ideaName,
            mentorFullname: item.mentorFullname,
            ideaCode: item.ideaCode,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt
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
                List ProposeIdea
            </Typography>

            <Box className="tableAccount" sx={{
                width: '95%',
                background: '#F6E8E8',
                borderRadius: '20px',
                marginTop: '50px',
                marginBottom: '50px',
            }}>
                <DataGrid
                    autoHeight
                    rows={rows}
                    onCellClick={(e) => (navigate(`/mentor/proposeidea/${e.row.ideaCode}`))}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10, 15, 20]}
                    sx={{
                        border: 'none',
                        borderRadius: '20px',
                        '& .MuiDataGrid-container--top [role=row]': {
                            background: "#D82C2C",
                            fontWeight: 'bold',
                            borderTopLeftRadius: '20px', 
                            borderTopRightRadius: '20px',
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

export default ListProposeIdea;