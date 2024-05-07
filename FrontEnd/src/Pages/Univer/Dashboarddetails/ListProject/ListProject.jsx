import React from 'react';
import { Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import { NavLink } from 'react-router-dom';

const columns = [
  { id: 'no', label: 'No', minWidth: 50 },
  { id: 'facultyName', label: 'Faculty Name', minWidth: 170 },
  {
    id: 'facultyCode',
    label: 'Faculty Code',
    minWidth: 170,
    align: 'left',
    format: (value) => value.toString(),
  },
  {
    id: 'phoneNumber',
    label: 'Phone Number',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toString(),
  },
];

function createData(no, facultyName, facultyCode, phoneNumber) {
  return { no, facultyName, facultyCode, phoneNumber };
}

const rows = [
  createData('P001', 'Project A', 'C1SE.01', 'Active'),
  createData('P002', 'Project B', 'C1SE.01', 'Inactive'),
  createData('P003', 'Project C', 'C1SE.01', 'Active'),
  createData('P004', 'Project D', 'C1SE.01', 'Active'),
  createData('P005', 'Project E', 'C1SE.01', 'Inactive'),
  createData('P006', 'Project F', 'C1SE.01', 'Active'),
  createData('P007', 'Project G', 'C1SE.01', 'Inactive'),
  createData('P008', 'Project H', 'C1SE.01', 'Active'),
  createData('P009', 'Project I', 'C1SE.01', 'Inactive'),
  createData('P010', 'Project J', 'C1SE.01', 'Active'),
  createData('P011', 'Project K', 'C1SE.01', 'Inactive'),
  createData('P012', 'Project L', 'C1SE.01', 'Active'),
  createData('P013', 'Project M', 'C1SE.01', 'Inactive'),
  createData('P014', 'Project N', 'C1SE.01', 'Active'),
  createData('P015', 'Project O', 'C1SE.01', 'Inactive'),
];

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const homeClick = () => {
    window.location.href = "/Univer/Inforproject"
  }
  // const homeClick = () => {
  //   window.location.href = "/Univer/Inforproject"
  // }
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 640 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, fontWeight: 'bold' }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (

                <TableRow hover role="checkbox" tabIndex={-1} key={row.no}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        <Typography
                          component="div"
                          style={{ cursor: 'pointer' }}
                          onClick={homeClick}
                        >
                          {column.format && typeof value === 'number' ? column.format(value) : value}
                        </Typography>
                      </TableCell>
                    );
                  })}
                </TableRow>


              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
