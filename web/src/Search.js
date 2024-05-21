import React from 'react';
import ResponsiveAppBar from './ResponsiveAppBar';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import Chart from './Chart';
import Deposits from './example/Deposits';
import RankTable from './example/Table';
import Button from '@mui/material/Button';
import SearchText from './SearchText';
import TextField from '@mui/material/TextField';
import BasicSelect from './SearchOption';
import GenreTable from './GenreTable';
import BookTable from './BookTable';
import books from './images/books.webp'
import Login from './Login';

const defaultTheme = createTheme();

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
export default function Search() {
    return (
        <ThemeProvider theme={defaultTheme}>
            <Paper
                sx={{
                    width: '100%',
                }}>
                <ResponsiveAppBar />
            </Paper>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />
                    <Login />
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4, }}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100px', justifyContent: 'center' }}>
                                    <SearchText />
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4, }}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100px', justifyContent: 'center' }}>
                                    <BasicSelect />
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <Grid container spacing={3}>
                            {/* 장르 테이블 */}
                            <Grid item xs={12} md={6}>
                                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                    <GenreTable />
                                </Paper>
                            </Grid>
                            {/* 책 테이블 */}
                            <Grid item xs={12} md={6}>
                                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                    <BookTable />
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4, }}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '500px', justifyContent: 'center' }}>
                                    <Typography
                                        variant="h4"
                                        noWrap
                                        component="h4">
                                        검색한 후의 페이지
                                    </Typography>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                    {/* 검색한 후의 책 제목 또는 키워드가 출력될 예정 */}
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4, }}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100px', justifyContent: 'center' }}>
                                    <Typography
                                        variant="h6"
                                        noWrap
                                        component="h6">
                                        피를 마시는 새 / 이영도
                                    </Typography>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                    {/* 검색할때 선택했던 값들이 출력될 예정 */}
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4, }}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100px', justifyContent: 'center' }}>
                                    <BasicSelect />
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <Grid container spacing={3}>
                            {/* Chart */}
                            <Grid item xs={12} >
                                <Paper
                                    sx={{
                                        justifyContent: 'center',
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: '100%',
                                    }}
                                >
                                    <Chart />
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <Grid container spacing={3}>
                            {/* 연관 장르 테이블 */}
                            <Grid item xs={12} md={6}>
                                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                    <GenreTable />
                                </Paper>
                            </Grid>
                            {/* 연관 책 테이블 */}
                            <Grid item xs={12} md={6}>
                                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                    <BookTable />
                                </Paper>
                            </Grid>
                        </Grid>
                        <Copyright sx={{ pt: 2 }} />
                    </Container>
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4, }}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '500px', justifyContent: 'center' }}>
                                    <Typography
                                        variant="h4"
                                        noWrap
                                        component="h4">
                                        검색한 후의 페이지
                                    </Typography>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                    <div>

                        <img src={books} alt='Description' sx={{ height: '300px' }} />

                    </div>
                </Box>
            </Box>
        </ThemeProvider>
    )
}