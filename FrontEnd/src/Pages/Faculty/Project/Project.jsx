import * as React from 'react';
import { Button, Box, Typography } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import { Edit, Delete } from "@mui/icons-material";
import { useState } from 'react';

const columns = [
    {
        field: 'id',
        headerName: 'No.',
        width: 100,
    },
    { field: 'projectCode', headerName: 'Project Code', width: 300 },
    { field: 'projectName', headerName: 'Project Name', width: 400 },
    { field: 'leader', headerName: 'Leader', width: 300 },
    { 
        field: 'status', 
        headerName: 'Status', 
        width: 200,
        renderCell: (params) => {
            const status = params.row.status;
            let color = '';
            switch (status) {
                case 'Waiting':
                    color = '#ffff00'; 
                    break;
                case 'Refuse':
                    color = '#ff0000';
                    break;
                case 'Accept':
                    color = '#00ff00'; 
                    break;
                case 'Complete':
                    color = '#0000ff'; 
                    break;
                default:
                    color = '';
            }
            return (
                <div style={{ backgroundColor: color, width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius:'10px' }}>
                    {status}
                </div>
            );
        },
    },
];

const Project = () => {
    const [listAccount, setListAccount] = useState([
        { id: 1, projectCode: 'univer', projectName: 'truongdulich', leader: 'DTDL', status: 'Refuse' },
        { id: 2, projectCode: 'univer', projectName: 'truongdaotao', leader: 'DTQT', status: 'Waiting' },
        { id: 3, projectCode: 'faculty', projectName: 'nguyentanhthang', leader: '26211329003', status: 'Accept' },
        { id: 4, projectCode: 'student', projectName: 'duongnguyencongluan', leader: '26211329003', status: 'Complete' },
        { id: 5, projectCode: 'student', projectName: 'nguyenhoangquocanh', leader: '26211329003', status: 'Refuse' },
        { id: 6, projectCode: 'student', projectName: 'nguyenquocnhat', leader: '26211329003', status: 'Complete' },
        { id: 7, projectCode: 'student', projectName: 'nguyenxuanvang', leader: '26211329003', status: 'Waiting' },
        { id: 8, projectCode: 'student', projectName: 'nguyentanhdo', leader: '26211329003', status: 'Accept' },
        { id: 9, projectCode: 'student', projectName: 'trancongtri', leader: '26211329003', status: 'Refuse' },
        { id: 10, projectCode: 'univer', projectName: 'truongdulich', leader: 'DTDL', status: 'Refuse' },
    ]);

    return (
        <Box className="container" sx={{ margin: "50px 0 0 50px" }}>
            <Typography
                variant="h4"
                sx={{
                    color: "#D82C2C",
                    fontWeight: "bold",
                }}>
                Project
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
                    rows={listAccount}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 10 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
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
                            color: '#707070'
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

export default Project;