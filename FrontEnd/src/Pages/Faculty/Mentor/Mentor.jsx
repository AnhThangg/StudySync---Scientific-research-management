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
    { field: 'mentorName', headerName: 'Mentor Name', width: 400 },
    { field: 'mentorDegree', headerName: 'Mentor Degree', width: 300 },
    { field: 'phone', headerName: 'Phone', width: 300 },
    { field: 'email', headerName: 'Email', width: 300 },
    
];

const Mentor = () => {
    const [listAccount, setListAccount] = useState([
        { id: 1, mentorName: 'Dương Nguyễn Công Luận', mentorDegree: 'Doctor', phone: '0796503172', email: 'duongnguyencongluan@gmail.com' },
        { id: 2, mentorName: 'univer', mentorDegree: 'truongdaotao', phone: 'DTQT', email: 'Waiting' },
        { id: 3, mentorName: 'faculty', mentorDegree: 'nguyentanhthang', phone: '26211329003', email: 'Accept' },
        { id: 4, mentorName: 'student', mentorDegree: 'duongnguyencongluan', phone: '26211329003', email: 'Complete' },
        { id: 5, mentorName: 'student', mentorDegree: 'nguyenhoangquocanh', phone: '26211329003', email: 'Refuse' },
        { id: 6, mentorName: 'student', mentorDegree: 'nguyenquocnhat', phone: '26211329003', email: 'Complete' },
        { id: 7, mentorName: 'student', mentorDegree: 'nguyenxuanvang', phone: '26211329003', email: 'Waiting' },
        { id: 8, mentorName: 'student', mentorDegree: 'nguyentanhdo', phone: '26211329003', email: 'Accept' },
        { id: 9, mentorName: 'student', mentorDegree: 'trancongtri', phone: '26211329003', email: 'Refuse' },
        { id: 10, mentorName: 'univer', mentorDegree: 'truongdulich', phone: 'DTDL', email: 'Refuse' },
    ]);

    return (
        <Box className="container" sx={{ margin: "50px 0 0 50px" }}>
            <Typography
                variant="h4"
                sx={{
                    color: "#D82C2C",
                    fontWeight: "bold",
                }}>
                Mentor
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

export default Mentor;