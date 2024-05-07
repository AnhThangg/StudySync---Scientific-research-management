import { React, useState, useEffect } from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  colors,
} from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from "react-router-dom";
import { getUnconfirmedTopicsForMentor } from '../../../api/mentor.Api';

const StickyHeadTable = () => {

  const navigate = useNavigate();
  const [listTopic, setListTopic] = useState([]);

  useEffect(() => {
    getUnconfirmedTopicsForMentor()
      .then(list => {
        setListTopic(list);
      })
  }, []);


  const columns = [
    { field: 'id', headerName: 'No.', width: 80 },
    { field: 'topicCode', headerName: 'Topic Code', width: 220 },
    { field: 'topicName', headerName: 'Topic Name', width: 370 },
    { field: 'leader', headerName: 'Leader', width: 330, },
    { field: 'dateCreate', headerName: 'Created At', width: 280, },
  ];

  const rows = listTopic.map((item) => {
    return {
      id: item.no,
      topicCode: item.topicCode,
      topicName: item.topicName,
      leader: item.leader,
      dateCreate: item.dateCreate
    }
  })

  return (
    <Box sx={{ margin: "10px 0 0 50px" }}>
      <Box
        sx={{
          width: '95%',
          background: '#F6E8E8',
          borderRadius: '20px',
          marginBottom: '30px',
        }}
      >
        <DataGrid
          autoHeight
          rows={rows}
          onCellClick={(e) => (navigate(`/mentor/unconfirmedtopicformentor/${e.row.topicCode}`))}
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
              borderRadius: '20px 20px 0 0',
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

export default StickyHeadTable
