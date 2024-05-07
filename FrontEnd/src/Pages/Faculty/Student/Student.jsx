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
    { field: 'studentName', headerName: 'Student Name', width: 400 },
    { field: 'studentID', headerName: 'Student ID', width: 300 },
    { field: 'class', headerName: 'Class', width: 300 },
    { field: 'email', headerName: 'Email', width: 300 },
    
];

const Student = () => {
    const [listAccount, setListAccount] = useState([
        { id: 1, studentName: 'Dương Nguyễn Công Luận', studentID: '26211236334', class: 'CMU K26-TPM4', email: 'duongnguyencongluan@gmail.com' },
        { id: 2, studentName: 'univer', studentID: 'truongdaotao', class: 'DTQT', email: 'Waiting' },
        { id: 3, studentName: 'faculty', studentID: 'nguyentanhthang', class: '26211329003', email: 'Accept' },
        { id: 4, studentName: 'student', studentID: 'duongnguyencongluan', class: '26211329003', email: 'Complete' },
        { id: 5, studentName: 'student', studentID: 'nguyenhoangquocanh', class: '26211329003', email: 'Refuse' },
        { id: 6, studentName: 'student', studentID: 'nguyenquocnhat', class: '26211329003', email: 'Complete' },
        { id: 7, studentName: 'student', studentID: 'nguyenxuanvang', class: '26211329003', email: 'Waiting' },
        { id: 8, studentName: 'student', studentID: 'nguyentanhdo', class: '26211329003', email: 'Accept' },
        { id: 9, studentName: 'student', studentID: 'trancongtri', class: '26211329003', email: 'Refuse' },
        { id: 10, studentName: 'univer', studentID: 'truongdulich', class: 'DTDL', email: 'Refuse' },
    ]);

    return (
        <Box className="container" sx={{ margin: "50px 0 0 50px" }}>
            <Typography
                variant="h4"
                sx={{
                    color: "#D82C2C",
                    fontWeight: "bold",
                }}>
                Student
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

export default Student;