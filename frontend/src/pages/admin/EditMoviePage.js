import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieById } from '../../features/movies/movieSlice';
import MainLayout from '../../layouts/MainLayout';
import MovieForm from '../../components/MovieForm';

const EditMoviePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedMovie, loading } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(fetchMovieById(id));
  }, [dispatch, id]);

  if (loading) {
    return (
      <MainLayout>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '60vh',
          }}
        >
          <CircularProgress />
        </Box>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Container>
        <Box sx={{ mt: 4, mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Edit Movie
          </Typography>
          <MovieForm movieId={id} />
        </Box>
      </Container>
    </MainLayout>
  );
};

export default EditMoviePage; 