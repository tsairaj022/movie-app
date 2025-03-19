import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import MainLayout from '../../layouts/MainLayout';
import MovieForm from '../../components/MovieForm';

const CreateMoviePage = () => {
  return (
    <MainLayout>
      <Container>
        <Box sx={{ mt: 4, mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Add New Movie
          </Typography>
          <MovieForm />
        </Box>
      </Container>
    </MainLayout>
  );
};

export default CreateMoviePage; 