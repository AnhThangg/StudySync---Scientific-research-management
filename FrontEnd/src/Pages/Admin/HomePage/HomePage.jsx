import * as React from 'react';
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
import { Edit, Delete } from "@mui/icons-material";
import { useEffect } from 'react';
import { deleteAccount, getAccount } from '../../../api/adminApi';
import { useState } from 'react';

const HomePage = () => {
    const [listAccount, setListAccount] = useState([]);
    const [message, setMessage] = useState('');
    const [isCheckAlert, setIsCheckAlert] = useState(false);
    const [alertType, setAlertType] = useState('error');
    const [openDialog, setOpenDialog] = useState(false);
    const [idDelete, setIdDelete] = useState('');
    const [infoAccount, setInfoAccount] = useState({});

    useEffect(() => {
        getAccount('all')
            .then(list => {
                setListAccount(list);
            })
    }, []);

    const columns = [
        {
            field: 'id',
            headerName: 'No.',
            width: 120,
        },
        { field: 'role', headerName: 'Role', width: 200 },
        { field: 'username', headerName: 'User Name', width: 350 },
        { field: 'roleCode', headerName: 'Role Code', width: 300, },
        {
            field: 'action',
            headerName: 'Action',
            description: 'This column has edit and delete functions and cannot be sorted',
            sortable: false,
            width: 300,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => {
                return (
                    <div>
                        <Button
                            onClick={() => handleEdit(params.row.accountId)}
                            sx={{
                                color: '#707070',
                                '&:hover': {
                                    background: 'none',
                                    color: '#D82C2C'
                                }
                            }}>
                            <Edit fontSize='large' />
                        </Button>
                        <Button
                            onClick={() => onDeleteAccount(params.row.accountId)}
                            sx={{
                                color: '#707070',
                                '&:hover': {
                                    background: 'none',
                                    color: '#D82C2C'
                                }
                            }}>
                            <Delete fontSize='large' />
                        </Button>
                    </div>
                );
            },
        },
    ];

    const rows = listAccount.map((item, index) => {
        return {
            id: index + 1,
            role: item.role,
            username: item.userName,
            roleCode: item.roleCode,
            accountId: item.accountId,
            userName: item.userName,
        }
    })
    const onDeleteAccount = async (id) => {
        // console.log(listAccount.find(item => item.accountId === id));
        const getInfoAccount = await listAccount.find(item => item.accountId === id);
        setInfoAccount(getInfoAccount);
        setIdDelete(id);
        setOpenDialog(true);
    }

    const onConfirmDeleteAccount = async () => {
        const res = await deleteAccount(idDelete);
        if (res.status === 200) {
            const newList = listAccount.filter(item => item.accountId !== idDelete);
            setListAccount(newList);
            setOpenDialog(false)
            setAlertType('success');
            setMessage(res.data);
            setIsCheckAlert(true);
            setTimeout(() => {
                setIsCheckAlert(false);
            }, 4000)
        }
    }

    return (
        <Box className="container" sx={{ margin: "50px 0 0 50px" }}>
            <Typography
                variant="h4"
                sx={{
                    color: "#D82C2C",
                    fontWeight: "bold",
                }}>
                HomePage
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
                    onCellClick={()=>console.log('cc')}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 10 },
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
                            color: '#707070'
                        },
                        '& .css-1essi2g-MuiDataGrid-columnHeaderRow': {
                            borderTopLeftRadius: '20px',
                            borderTopRightRadius: '20px',
                        }
                    }}
                />
            </Box>
            <Dialog
                open={openDialog}
                // onClose=''
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {`Do you want to delete Account: '${infoAccount.userName}'`}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <span>Username: </span>
                        <span>{infoAccount.userName}</span>
                        <br />
                        Role: {infoAccount.role}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Disagree</Button>
                    <Button autoFocus onClick={onConfirmDeleteAccount}>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={isCheckAlert} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert variant="outlined" severity={alertType}>{message}</Alert>
            </Snackbar>
        </Box>
    )
}

export default HomePage