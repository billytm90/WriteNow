import React from 'react';
import ResponsiveAppBar from './ResponsiveAppBar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import { Button } from '@mui/material';
import TestChart from './Chart';
import ChartCarousel from './ChartCarousel';
// import books from 'web/public/images/books.jpg';
import { useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import "./styles.css";
import AiCarousel from './AiCarousel';

const theme = createTheme({
    typography: {
        fontFamily: '"Noto Sans KR", sans-serif',
    },
});

function Copyright(props) {
    return (
        <Typography to="/" variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="http://localhost:3000">
                PyveGuys
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
export default function Search() {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        // Navigate to "/SharedInput" route
        navigate('/YearTrend');
    };
    return (
        <ThemeProvider theme={theme}>
            {/* <Paper  
                sx={{
                    width: '100%',
                }}>
                <ResponsiveAppBar />
            </Paper> */}
            <CssBaseline />
            <Box
                component="main"
                sx={{
                    backgroundColor: 'white',
                    flexGrow: 1,
                    overflow: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >



                <Container maxWidth="lg" sx={{ mt: 4, mb: 4, }}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Paper elevation={0} sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '500px', justifyContent: 'center' }}>
                                <Typography
                                    variant="h3"
                                    noWrap
                                    component="h3"
                                    sx={{
                                        fontFamily: '"Kodchasan", sans-serif', // Set the specific font here
                                    }}>
                                    <Box component="span" sx={{ color: '#3399FF' }}>W</Box>
                                    <Box component="span" sx={{ color: 'black' }}>rite Now</Box>
                                    <Box component="span" sx={{ color: '#3399FF' }}>!</Box>
                                </Typography>
                                <Typography
                                    variant="h6"
                                    noWrap
                                    component="h6">
                                    한눈에 쉽고 빠르게 각종 분야의 트렌드를 확인하자!
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4, }}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Paper elevation={0} sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '500px', justifyContent: 'center', borderRadius: '20px' }}>
                                <ChartCarousel />
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
                {/* <Container maxWidth="lg" sx={{ mt: 4, mb: 4, }}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Paper elevation={5} sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '500px', justifyContent: 'center', border: '1px solid #4028ca', borderRadius: '20px' }}>
                                    <AiCarousel/>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container> */}
                <AiCarousel />
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Box
                                elevation={0}
                                sx={{
                                    position: 'relative',
                                    overflow: 'hidden',
                                    width: '100%',
                                    height: 'auto',
                                    maxWidth: '100%',
                                    maxHeight: '100%',
                                    backgroundColor: '#EEF3FF',
                                    borderRadius: '20px',
                                }}
                            >
                                <img
                                    src={'/images/books.jpg'}
                                    alt='Description'
                                    style={{ opacity: 0.3, width: '100%', height: 'auto', maxWidth: '100%', maxHeight: '100%' }}
                                />
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        textAlign: 'center',
                                        color: 'black',
                                    }}
                                >
                                    <Typography
                                        variant="h4"
                                        sx={{
                                            padding: '8px',
                                            borderRadius: '4px',
                                        }}
                                    >
                                        IT분야의 최신 트렌드를 한눈에!
                                    </Typography>
                                    <Button
                                        onClick={handleButtonClick}
                                        variant="contained"
                                        color="primary"
                                        size='large'
                                        sx={{ mt: 2 }}
                                    >
                                        지금 확인하기
                                    </Button>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>

                <Copyright sx={{ pt: 2 }} />

            </Box>
        </ThemeProvider >
    )
}