import React from 'react';
import styled from "@emotion/styled";
import Slider from 'react-slick';
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

const Image = styled.img`
  height: 400px;
`;

export default function AiCarousel() {
    const settings = {
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        speed: 5000,
        autoplaySpeed: 0,
    };

    const images = [
        '/images/sample2.jpg',
        '/images/sample3.jpg',
        '/images/sample4.jpg',
        '/images/sample5.jpg',
        '/images/sample6.jpg',
        '/images/sample7.jpg',
    ];

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Paper elevation={5} sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '500px', justifyContent: 'center',borderRadius: '20px' }}>
                        <div style={{ width: '100%' }}>
                            <Slider {...settings}>
                                {images.map((image, index) => (
                                    <div key={index}>
                                        <Image src={image} alt={`Slide ${index + 1}`} />
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};
