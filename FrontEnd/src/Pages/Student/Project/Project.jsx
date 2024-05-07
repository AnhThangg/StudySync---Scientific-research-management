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
import { getTopicApprovedForStudent } from '../../../api/studentApi';


function Project() {
  const [listTopic, setListTopic] = useState([]);

  useEffect(() => {
    getTopicApprovedForStudent()
      .then(list => {
        setListTopic(list);
      })
  }, []);

  const usenavigate = useNavigate();

  const handleCreateProject = () => {
    usenavigate("/student/project/createProject");
  };

  const columns = [
    { field: 'id', headerName: 'No.', width: 80 },
    { field: 'topicCode', headerName: 'Topic Code', width: 220 },
    { field: 'topicName', headerName: 'Topic Name', width: 370 },
    { field: 'leader', headerName: 'Leader', width: 330, },
    { field: 'mentor', headerName: 'Mentor', width: 300, },
  ];


  const rows = listTopic.map((item) => {
    return {
      id: item.no,
      topicCode: item.topicCode,
      topicName: item.topicName,
      leader: item.studentFullname,
      mentor: item.mentorFullname,
    }
  })

  return (
    <Box sx={{ margin: "50px 0 0 50px" }}>
      <Box
        sx={{
          borderBottom: "1.5px solid #707070",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: "#D82C2C",
            fontWeight: "bold",
          }}
        >
          Topics
        </Typography>
      </Box>

      <Box
        sx={{
          width: '95%',
          background: '#F6E8E8',
          borderRadius: '20px',
          marginTop: '50px',
          marginBottom: '30px',
        }}
      >
        <DataGrid
          autoHeight
          rows={rows}
          onCellClick={(e) => (usenavigate(`/student/project/informationProject/${e.row.topicCode}`))}
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

      <Box>
        <Button
          sx={{
            border: "3px solid #D82C2C",
            borderRadius: "20px",
            width: "200px",
            height: "50px",
            color: "#D82C2C",
            fontSize: "16px",
            textTransform: "none",
          }}
          onClick={handleCreateProject}
        >
          + Create Project
        </Button>
      </Box>
    </Box>
  );
}

export default Project;
