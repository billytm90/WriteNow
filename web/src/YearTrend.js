import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
// import books from './images/books.jpg'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import WholeBookTrend from './WholeBookTrend';
import WholeKeywordTrend from './WholeKeywordTrend';
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
const ariaLabel = { 'aria-label': 'description' };

const years = [
    2014,
    2015,
    2016,
    2017,
    2018,
    2019,
    2020,
    2021,
    2022,
    2023,
    2024
]

function YearSelect({ onChange }) {
    const [year, setYear] = React.useState('');
    const handleChange = (event) => {
        const selectedYear = event.target.value;
        setYear(selectedYear);
        onChange(selectedYear);
    };
    return (
        <Box sx={{ minWidth: 120 }}>
            {/* 연도 선택 */}
            <FormControl sx={{ m: 1, minWidth: 120, backgroundColor: 'white' }}>
                <InputLabel id="demo-simple-select-label">연도 선택</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={year}
                    label="year"
                    onChange={handleChange}
                >
                    {years.map((year) => (
                        <MenuItem
                            key={year}
                            value={year}
                        >
                            {year}
                        </MenuItem>
                    ))}

                </Select>
            </FormControl>
        </Box>
    );
}

export default function YearTrend() {
    const [selectedYear, setSelectedYear] = React.useState(2023); // Default year

    const handleYearChange = (year) => {
        setSelectedYear(year);
    };

    return (
        <ThemeProvider theme={theme}>
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
                {/* <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Paper elevation={5} sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100px', justifyContent: 'center', backgroundColor: '#EEF3FF', borderRadius: '20px' }}>
                                    <YearSelect onChange={handleYearChange} />
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container> */}
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Box elevation={5} sx={{ position: 'relative', overflow: 'hidden', width: '100%', height: 'auto', maxWidth: '100%', maxHeight: '100%', backgroundColor: '#EEF3FF', borderRadius: '20px' }}>
                                <img src={'/images/books.jpg'} alt='Description' style={{ opacity: 0.3, width: '100%', height: 'auto', maxWidth: '100%', maxHeight: '100%' }} />
                                <Typography
                                    variant="h4"
                                    sx={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        color: '#545454',
                                        padding: '8px',
                                        borderRadius: '4px',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    최신 트렌드 책과 키워드
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                    <Grid container spacing={3}>
                        {/* 장르 테이블 */}
                        <Grid item xs={12} sm={8}>
                            <WholeBookTrend />
                        </Grid>
                        {/* 책 테이블 */}
                        <Grid item xs={12} sm={4}>
                            <WholeKeywordTrend />
                        </Grid>
                    </Grid>
                </Container>
                <Copyright sx={{ pt: 2 , mb: 4}} />
            </Box>
        </ThemeProvider>
    );
}
