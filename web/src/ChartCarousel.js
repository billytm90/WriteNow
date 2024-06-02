// ChartCarousel.js
import React, { useState } from 'react';
import { ThemeProvider, Container, Grid, Box, CssBaseline, Paper, Typography, TextField, Button } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { styled, createTheme } from '@mui/material/styles';
import TestChart from './Chart';
import { useNavigate } from 'react-router-dom';

import Slider from 'react-slick';

const defaultTheme = createTheme();

const queryClient = new QueryClient();

const queries = ["Python", "Java", "SQL", "DB", "React"];

const ChartCarousel = () => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setQuery(e.target.elements.query.value);
    };

    const handleButtonClick = () => {
        // Navigate to "/SharedInput" route
        navigate('/SharedInput');
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 6000,
        pauseOnHover: true,
        appendDots: dots => (
            <div>
                <ul style={{ margin: "0px" }}> {dots} </ul>
            </div>
        ),
    };

    return (
        <Box sx={{ width: '95%', margin: 'auto', position: 'relative' }}>
            {/* Text on top of the slider */}
            <Box sx={{ position: 'absolute', top: 0, left: '50%', transform: 'translate(-50%,80%)', textAlign: 'left' }}>
                <Typography variant="h4" component="div" style={{ color: 'black', marginBottom: '4px' }}>
                    지금 IT분야의 각종 키워드와
                </Typography>
                <Typography variant="h4" component="div" style={{ color: 'black', marginBottom: '4px' }}>
                    책의 트렌드를 확인해보세요.
                </Typography>
            </Box>
            {/* Slider with charts and textfields */}
            <Slider {...settings}>
                {queries.map((query, index) => (
                    <Box key={index} sx={{ padding: 2, position: 'relative' }}>
                        {/* Wrapper with opacity */}
                        <Box sx={{ opacity: 0.4 }}>
                            <TestChart query={query} />
                        </Box>
                        {/* Overlay with text and textfield */}
                        <Box
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, 100%)',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            {/* TextField with query */}
                            <Box>
                                <form onSubmit={handleSubmit} style={{ display: 'flex', marginBottom: '20px' }}>
                                    <TextField
                                        name="query"
                                        type="text"
                                        variant="outlined"
                                        defaultValue={query}
                                        fullWidth
                                        onChange={(event) => console.log(event.target.value)}
                                        style={{ marginRight: '10px', backgroundColor: 'white' }}
                                    />
                                    <Button onClick={handleButtonClick} variant="contained" color="primary">
                                        검색
                                    </Button>
                                </form>
                            </Box>
                        </Box>
                    </Box>
                ))}
            </Slider>
        </Box>
    );
};

export default ChartCarousel;