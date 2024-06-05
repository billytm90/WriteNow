import React, { useState } from 'react';
import styled from "@emotion/styled";
import Slider from 'react-slick';
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { TextField, Container, Typography } from '@mui/material';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useTypingEffect from './useTypingEffect';

const Image = styled.img`
  height: 500px;
`;

const Frame = styled.div`
  padding: 10px; /* Adjust the padding as needed */
  border: 10px solid #1a8cff; /* White border to simulate a frame */
  background-color: #99ccff; /* Background color for the frame */
`;

export default function AiCarousel() {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        // Navigate to "/SharedInput" route
        navigate('/GenerateImage');
    };
    const [currentSlide, setCurrentSlide] = useState(0);

    const settings = {
        fade: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 500,
        autoplaySpeed: 5000,
        afterChange: (index) => setCurrentSlide(index),
    };

    const images = [
        '/images/sample2.jpg',
        '/images/sample3.jpg',
        '/images/sample4.jpg',
        '/images/sample5.jpg',
        '/images/sample6.jpg',
        '/images/sample7.jpg',
    ];

    const texts = [
        "머리카락을 무지개색으로 염색하고 화려한 귀걸이와 메이크업을 한 푸른 눈동자의 아름다운 실사풍 여성",
        "중세시대 궁전을 배경으로 하고 화려한 메이크업, 머리장식을하고 커다란 보석들이 촘촘하게 박혀있는 목걸이와 드레스를 입고 있는 여성",
        "나무 한그루를 중심으로 원을 그리고 원을 사등분하여 각 부분마다 봄 여름 가을 겨울의 사계절을 하나씩 표현한 그림",
        "두발로 서서 빅토리안 시대 정장과 보라색 코트를 입고 있는 웰시 코기",
        "왕관을 쓰고 화려한 장식이 가미된 기사의 투구를 쓰고 있는 회색 러시안 블루 고양이",
        "검은색 기사의 갑옷을 입고 칼을 빼들은 채로 앞으로 내밀고 있는 갈색 토끼",
    ];
    
    const typedText = useTypingEffect(texts[currentSlide]);

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            borderRadius: '20px',
                        }}
                    >
                        <Grid container spacing={1}>
                            <Box
                                sx={{
                                    width: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    my: 5, // Adds margin on top and bottom
                                }}
                            >
                                <Typography
                                    variant="h4"
                                    noWrap
                                    component="h4"
                                    align="center"
                                    sx={{
                                        fontWeight: 'bold'
                                    }}
                                >
                                    원하는 그림의 프롬프트를 입력해보세요.
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <Box sx={{ width: '80%', ml: 12 }}>
                                    <Slider {...settings}>
                                        {images.map((image, index) => (
                                            <div key={index} style={{ display: 'flex', justifyContent: 'center' }}>
                                                <Frame>
                                                    <Image src={image} alt={`Slide ${index + 1}`} style={{ boxShadow: '50px 50px 50px rgba(0, 0, 0, 0.1)', maxWidth: '100%', height: 'auto' }} />
                                                </Frame>
                                            </div>
                                        ))}
                                    </Slider>
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', mt: 20 }}>
                                    <TextField
                                        label="Prompt"
                                        variant="outlined"
                                        multiline
                                        rows={2}
                                        value={texts[currentSlide]} // Sync TextField value with the current slide
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                    <Button
                                        onClick={handleButtonClick}
                                        variant="contained"
                                        color="primary"
                                        size='large' // Adjust button size
                                        sx={{ alignSelf: 'center', mt: 2 }} // Align button to the center vertically and add margin top
                                    >
                                        직접 생성해보기
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}
