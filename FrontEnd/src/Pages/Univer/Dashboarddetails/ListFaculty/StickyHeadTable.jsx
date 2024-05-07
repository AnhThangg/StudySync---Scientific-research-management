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
  createData(1, 'Khoa Công Nghệ Phần Mềm', 'CMU-TPM', '0123121231'),
  createData(2, 'Khoa Du Lịch', 'DT-DL', '012342211'),
  createData(3, 'Khoa Tài Chính', 'DT-TC', '0912312553'),
  createData(4, 'Khoa Kế Toán', 'DT-KT', '091223466'),
  createData(5, 'Khoa Ngôn Ngữ Anh', 'DT-TT', '091524521'),
  createData(6, 'Khoa Ngôn Ngữ Trung', 'DT-TA', '0912562322'),
  createData(7, 'Khoa Cơ Khí', 'DT-CK', '0901231221'),
  createData(8, 'Khoa Y', 'DT-Y', '890-123-4567'),
  createData(9, 'Khoa Điều Dưỡng', 'DT-ĐD', '901-234-5678'),
  createData(10, 'Khoa Răng - Hàm - Mặt', 'DT-RHM', '012-345-6789'),
  createData(11, 'Khoa Ngân Hàng', 'DT-NH', '123-456-7890'),
  createData(12, 'Khoa Xã Hội Và Nhân Văn', 'DT-XHNV', '234-567-8901'),
  createData(13, 'Khoa Luật', 'DT-L', '345-678-9012'),
  createData(14, 'Khoa Kinh Tế', 'DT-KT', '456-789-0123'),
  createData(15, 'Khoa Nông Lâm', 'DT-NL', '567-890-1234'),
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
    window.location.href = "/Univer/ListProject"
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
