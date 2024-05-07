import * as React from 'react';
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
import { useState, useEffect } from 'react';
import { getMyProposeIdea, deleteProposeIdea } from '../../../api/proposeIdeaApi';
import { useNavigate } from 'react-router-dom';

const MyProposeIdea = () => {

    const navigate = useNavigate();
    const [listProposeIdea, setListProposeIdea] = useState([]);
    const [infoIdea, setInfoIdea] = useState({});
    const [idDelete, setIdDelete] = useState('');
    const [message, setMessage] = useState('');
    const [isCheckAlert, setIsCheckAlert] = useState(false);
    const [alertType, setAlertType] = useState('error');
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        getMyProposeIdea()
            .then((data) => {
                setListProposeIdea(data)
            })
            .catch(e => {
                console.log(e)
            })
    }, [])

    const onDeleteIdea = async (id) => {
        const getInfoIdea = await listProposeIdea.find(item => item.ideaCode === id);
        setInfoIdea(getInfoIdea);
        setIdDelete(id);
        setOpenDialog(true);
    }

    const onConfirmDeleteIdea = async () => {
        const res = await deleteProposeIdea(idDelete);
        console.log(res);
        if (res.status === 200) {
            const newList = listProposeIdea.filter(item => item.ideaCode !== idDelete);
            setListProposeIdea(newList);
            setOpenDialog(false)
            setAlertType('success');
            setMessage(res.data);
            setIsCheckAlert(true);
            setTimeout(() => {
                setIsCheckAlert(false);
            }, 4000)
        }
    }

    const columns = [
        { field: 'id', headerName: 'No.', width: 100, },
        { field: 'ideaName', headerName: 'IdeaName', width: 250 },
        { field: 'otherNotes', headerName: 'Other notes', width: 280 },
        { field: 'createdAt', headerName: 'Created At', width: 250 },
        { field: 'updatedAt', headerName: 'Updated At', width: 200 },
        {
            field: 'action',
            headerName: 'Action',
            description: 'This column has edit and delete functions and cannot be sorted',
            sortable: false,
            width: 200,
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
                            onClick={() => onDeleteIdea(params.row.ideaCode)}
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

    const rows = listProposeIdea.map((item, index) => {
        return {
            id: index + 1,
            ideaName: item.ideaName,
            otherNotes: item.otherNotes,
            ideaCode: item.ideaCode,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt
        }
    })

    const formatContent = (text) => {
        if (typeof text !== 'string') {
            return [];
        }
        const lines = text.split('\n').map((line, index) => {
            return (
                <div key={index} style={{ textIndent: `20px`, marginBottom: `10px` }}>
                    {line}
                </div>
            );
        });
        return lines;
    }

    return (
        <Box className="container" sx={{ margin: "50px 0 0 50px" }}>
            <Typography
                variant="h4"
                sx={{
                    color: "#D82C2C",
                    fontWeight: "bold",
                }}>
                My ProposeIdea
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
                    // onCellClick={(e) =>(useNavigate(''))}
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
                            color: '#707070'
                        },
                        '& .css-1essi2g-MuiDataGrid-columnHeaderRow': {
                            borderTopLeftRadius: '20px',
                            borderTopRightRadius: '20px',
                        }
                    }}
                />
            </Box>
            <Dialog sx={{
                '& .MuiDialog-paper': {
                    width: '80%',
                    maxWidth: 'lg',
                },
            }}
                open={openDialog}
                // onClose=''
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" sx={{ color: '#D82C2C', fontWeight: 'bold', fontSize: '25px' }}>
                    {`Read the information carefully before browsing Topic!`}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Box className="dialogContain" sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px'
                        }}>
                            {/* Idea Name */}
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column'
                            }}>
                                <Typography sx={{ fontWeight: 'bold', color: '#1e385d', textDecoration: 'underline', fontSize: '20px' }}>Idea Name: </Typography>
                                <Typography sx={{ marginLeft: '10px', fontWeight: 'bold', color: '#D82C2C', fontSize: '20px' }}>{formatContent(infoIdea.ideaName)}</Typography>
                            </Box>

                            {/* Idea Description */}
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column'
                            }}>
                                <Typography sx={{ fontWeight: 'bold', color: '#1e385d', textDecoration: 'underline', fontSize: '20px' }}>Idea Description: </Typography>
                                <Typography sx={{ marginLeft: '10px', fontWeight: 'bold', color: '#718199', fontSize: '17px' }}>{formatContent(infoIdea.ideaDescription)}</Typography>
                            </Box>

                            {/* Idea Goal Of The Subject */}
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column'
                            }}>
                                <Typography sx={{ fontWeight: 'bold', color: '#1e385d', textDecoration: 'underline', fontSize: '20px' }}>Idea Goal Of The Subject: </Typography>
                                <Typography sx={{ marginLeft: '10px', fontWeight: 'bold', color: '#718199', fontSize: '17px' }}>{formatContent(infoIdea.ideaGoalSubject)}</Typography>
                            </Box>

                            {/* Idea expected research products of the topic and applicability */}
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column'
                            }}>
                                <Typography sx={{ fontWeight: 'bold', color: '#1e385d', textDecoration: 'underline', fontSize: '20px' }}>Idea expected research products of the topic and applicability: </Typography>
                                <Typography sx={{ marginLeft: '10px', fontWeight: 'bold', color: '#718199', fontSize: '17px' }}>{formatContent(infoIdea.ideaExpectedResearch)}</Typography>
                            </Box>

                            {/* Other Notes */}
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column'
                            }}>
                                <Typography sx={{ fontWeight: 'bold', color: '#1e385d', textDecoration: 'underline', fontSize: '20px' }}>Other Notes: </Typography>
                                <Typography sx={{ marginLeft: '10px', fontWeight: 'bold', color: '#718199', fontSize: '17px' }}>{formatContent(infoIdea.otherNotes)}</Typography>
                            </Box>

                        </Box>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)} className="reject" sx={{
                        background: '#1e385d',
                        border: '1px solid #1e385d',
                        borderRadius: '5px',
                        fontSize: '20px',
                        color: '#fff',
                        padding: '0 20px',
                        fontSize: '20px',
                        gap: '10px',
                        textTransform: 'none',
                        '&:hover': {
                            background: '#fff',
                            color: '#1e385d',
                        }
                    }}>
                        {/* <Clear fontSize='large' /> */}
                        Cancel
                    </Button>
                    <Button
                        autoFocus
                        onClick={onConfirmDeleteIdea}
                        className="approve"
                        sx={{
                            textTransform: 'none',
                            background: '#D82C2C',
                            border: '1px solid #D82C2C',
                            borderRadius: '5px',
                            fontSize: '20px',
                            color: '#fff',
                            padding: '0 20px',
                            gap: '10px',
                            '&:hover': {
                                background: '#fff',
                                color: '#D82C2C',
                            }
                        }}>
                        {/* <Check fontSize='large' /> */}
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={isCheckAlert} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert variant="filled" severity={alertType}>{message}</Alert>
            </Snackbar>
        </Box>
    )
}

export default MyProposeIdea;