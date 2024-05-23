import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { TextField, Button, CircularProgress, List, ListItem, ListItemText, Container, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Title from './example/Title';
import TablePagination from '@mui/material/TablePagination';
import { tableCellClasses } from '@mui/material/TableCell';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#01579b",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableCell2 = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "white",
    color: 'black',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: 'white',
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const fetchRelatedBooks = async ({ queryKey }) => {
  const [, query] = queryKey;
  const response = await fetch(`http://127.0.0.1:8000/api/trends/related_books?query=${query}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const RelatedBooks = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { data, error, isLoading } = useQuery({
    queryKey: ['relatedBooks', query],
    queryFn: fetchRelatedBooks,
    enabled: !!query,
    onSuccess: (data) => {
      console.log('Fetched data:', data);
      setSearchResults(data);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery(e.target.elements.query.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const columns = [
    { id: 'title', label: '제목', minWidth: 170 },
    { id: 'author_name', label: '작가', minWidth: 100 },
    { id: 'publisher_name', label: '출판사', minWidth: 100 },
    { id: 'edition', label: '판본', minWidth: 100 },
    { id: 'score', label: 'Sales 점수', minWidth: 100 },
  ];

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Box
          component="main"
          sx={{
            backgroundColor: 'white',
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper elevation={5} sx={{ p: 2, display: 'flex', flexDirection: 'column', backgroundColor: '#EEF3FF', borderRadius:'20px' }}>
                  <Typography variant="h5" component="h5" gutterBottom sx={{ pl: 1 }}>
                    키워드 검색
                  </Typography>
                  <form onSubmit={handleSubmit} style={{ display: 'flex', marginBottom: '20px' }}>
                    <TextField
                      name="query"
                      type="text"
                      defaultValue={query}
                      variant="outlined"
                      placeholder="키워드 입력"
                      fullWidth
                      style={{ marginRight: '10px', backgroundColor: 'white' }}
                    />
                    <Button type="submit" variant="contained" color="primary">
                      검색
                    </Button>
                  </form>
                </Paper>
              </Grid>
            </Grid>
          </Container>

          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper elevation={5} sx={{ p: 2, display: 'flex', flexDirection: 'column', backgroundColor: '#EEF3FF', borderRadius:'20px' }}>
                  <Typography variant="h5" component="h5" gutterBottom sx={{ pl: 1 }}>
                    검색 결과
                  </Typography>
                  {isLoading ? (
                    <CircularProgress />
                  ) : error ? (
                    <Typography color="error">An error occurred: {error.message}</Typography>
                  ) : (
                    data && (
                      <React.Fragment>
                        <Table>
                          <TableHead>
                            <TableRow>
                              {columns.map((column) => (
                                <StyledTableCell2 key={column.id} align="left" style={{ minWidth: column.minWidth }}>
                                  {column.label}
                                </StyledTableCell2>
                              ))}
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                              <StyledTableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                {columns.map((column) => {
                                  const value = row[column.id];
                                  return (
                                    <StyledTableCell key={column.id} align="left">
                                      {value}
                                    </StyledTableCell>
                                  );
                                })}
                              </StyledTableRow>
                            ))}
                          </TableBody>
                        </Table>
                        <TablePagination
                          rowsPerPageOptions={[10, 25, 100]}
                          component="div"
                          count={data.length}
                          rowsPerPage={rowsPerPage}
                          page={page}
                          onPageChange={handleChangePage}
                          onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                      </React.Fragment>
                    )
                  )}
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default RelatedBooks;