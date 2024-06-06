import React, { useState, useEffect } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import { Box, Button, Container, FormControl, TextField, Typography, Divider, InputLabel, MenuItem, Select, CircularProgress } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useUnsavedChanges } from './UnsavedChangesContext';

const theme = createTheme({
    typography: {
        fontFamily: '"Noto Sans KR", sans-serif',
    },
});


const samples = [1, 2, 3];

const sizes = [
    { label: "512 x 512", width: 512, height: 512 },
    { label: "480 x 640", width: 480, height: 640 },
    { label: "600 x 800", width: 600, height: 800 },
    { label: "640 x 640", width: 640, height: 640 },
    { label: "640 x 960", width: 640, height: 960 },
    { label: "1024 x 1024", width: 1024, height: 1024 },
    { label: "1024 x 1280", width: 1024, height: 1280 },
    { label: "1200 x 1600", width: 1200, height: 1600 }
];

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

export default function GenerateImage() {
    const [prompt, setPrompt] = useState('');
    const [numImages, setNumImages] = useState(1);
    // const [width, setWidth] = useState(512);
    // const [height, setHeight] = useState(512);
    const [selectedSize, setSelectedSize] = useState(sizes[0]); // Initialize with the first size option
    const [generatedImages, setGeneratedImages] = useState([]);
    const [loading, setLoading] = useState(false); // Added loading state

    const handleGenerateImage = async () => {
        setLoading(true); // Set loading to true when starting image generation
        try {
            const response = await fetch('http://127.0.0.1:8000/api/cover/generate_image/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prompt,
                    num_images: numImages,
                    height: selectedSize.height,
                    width: selectedSize.width
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
            }

            const data = await response.json(); // JSON 형태로 응답을 받음
            const imagesBase64 = data.images; // 서버에서 보낸 base64 인코딩된 이미지 배열

            // base64 인코딩된 이미지를 디코딩하여 이미지 URL로 변환
            const imageUrls = imagesBase64.map(base64Image => `data:image/png;base64,${base64Image}`);
            setGeneratedImages([...generatedImages, ...imageUrls]);
        } catch (error) {
            console.error('Error generating image:', error);
        } finally {
            setLoading(false); // Set loading to false when image generation completes or fails
        }
    };

    const handleSaveImage = (imageBase64, index) => {
        const link = document.createElement('a');
        link.href = imageBase64;
        link.download = `generated_image_${index}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
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
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Paper elevation={5} sx={{ p: 2, display: 'flex', flexDirection: 'column', backgroundColor: '#EEF3FF', borderRadius: '20px' }}>
                                <Typography variant="h5" component="h5" gutterBottom sx={{ pl: 1, fontWeight: 'bold', color: '#386495' }}>
                                    Prompt 입력
                                </Typography>
                                <TextField
                                    placeholder="ex) 언덕 위 나무와 오두막집"
                                    variant="outlined"
                                    fullWidth
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    sx={{ mb: 2, backgroundColor: 'white' }}
                                />
                                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                                    <FormControl sx={{ minWidth: 120, backgroundColor: 'white' }}>
                                        <InputLabel id="demo-simple-select-label">이미지 수</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={numImages}
                                            label="이미지 수"
                                            onChange={(e) => setNumImages(Number(e.target.value))}
                                        >
                                            {samples.map((numImages) => (
                                                <MenuItem
                                                    key={numImages}
                                                    value={numImages}
                                                >
                                                    {numImages}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <FormControl sx={{ minWidth: 120, backgroundColor: 'white' }}>
                                        <InputLabel id="size-select-label">Size</InputLabel>
                                        <Select
                                            labelId="size-select-label"
                                            id="size-select"
                                            value={selectedSize}
                                            label="Size"
                                            onChange={(e) => setSelectedSize(e.target.value)}
                                        >
                                            {sizes.map((option) => (
                                                <MenuItem
                                                    key={option.label}
                                                    value={option}
                                                >
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Box>
                                <Box mt={2} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Button variant="contained" color="primary" onClick={handleGenerateImage} disabled={loading}>
                                        {loading ? "생성 중..." : "이미지 생성"}
                                    </Button>
                                    <Typography variant="h10" component="h10" gutterBottom sx={{ mt: 1, fontSize: '0.8rem', color: '#386495', textDecoration: 'underline' }}>                                        페이지를 벗어나면 이미지는 저장되지 않고 삭제되므로 주의바랍니다.
                                    </Typography>
                                </Box>
                                {generatedImages.length > 0 && (
                                    <Box mt={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        {generatedImages.map((image, index) => (
                                            <React.Fragment>
                                                <Box key={index} sx={{ maxWidth: '100%', mb: 3 }}>
                                                    <img src={image} alt={`Generated ${index}`} style={{ maxWidth: '100%', height: 'auto' }} />
                                                </Box>
                                                <Box key={index} sx={{ mb: 3 }}>
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        size='small' onClick={() => handleSaveImage(image, index)}>이미지 저장</Button>
                                                </Box>
                                            </React.Fragment>
                                        ))}
                                    </Box>
                                )}
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
                <Copyright sx={{ pt: 2, mb: 4 }} />
            </Box>
        </ThemeProvider>
    );
}
