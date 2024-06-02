import React, { useState } from 'react';
import { ThemeProvider, Container, Grid, Box, CssBaseline, Paper, Typography, TextField, Button } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { styled, createTheme } from '@mui/material/styles';
import { CSSTransition } from 'react-transition-group';
import RelatedBooks from './SearchTable';
import RelatedKeyword from './KeywordTable';
import TestChart from './Chart';
import './fade.css'; // Make sure you have the corresponding CSS


const defaultTheme = createTheme();

const queryClient = new QueryClient();

const SharedInputComponent = () => {
    const [query, setQuery] = useState('');
    const [submittedQuery, setSubmittedQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setQuery(e.target.elements.query.value);
        setSubmittedQuery(e.target.elements.query.value);
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <QueryClientProvider client={queryClient}>
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
                                    <Paper elevation={5} sx={{ p: 2, display: 'flex', flexDirection: 'column', backgroundColor: '#EEF3FF', borderRadius: '20px' }}>
                                        <Typography variant="h5" component="h5" gutterBottom sx={{ pl: 1 }}>
                                            키워드 검색
                                        </Typography>
                                        <form onSubmit={handleSubmit} style={{ display: 'flex', marginBottom: '20px' }}>
                                            <TextField
                                                name="query"
                                                type="text"
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
                        <CSSTransition in={!!submittedQuery} timeout={5000} classNames="fade" unmountOnExit>
                            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <Paper
                                            elevation={5}
                                            sx={{
                                                justifyContent: 'center',
                                                p: 2,
                                                display: 'flex',
                                                flexDirection: 'column',
                                                height: '100%',
                                                border: '1px solid #4028ca',
                                                borderRadius: '20px'
                                            }}
                                        >
                                            <Typography variant="h5" component="h5" gutterBottom sx={{ pl: 2 }}>
                                                {submittedQuery}의 최근 12개월간의 관심도 변화
                                            </Typography>
                                            <TestChart query={submittedQuery} />
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </Container>
                        </CSSTransition>
                        <CSSTransition in={!!submittedQuery} timeout={300} classNames="fade" unmountOnExit>
                            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={8}>
                                        <RelatedBooks query={query} />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <RelatedKeyword query={query} />
                                    </Grid>
                                </Grid>
                            </Container>
                        </CSSTransition>
                    </Box>
                </Box>
            </QueryClientProvider>
        </ThemeProvider>
    );
};

export default SharedInputComponent;