import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  Box,
  Paper,
  Chip,
  Button,
  CircularProgress,
  Alert,
  Divider,
} from '@mui/material';
import MainLayout from '../layouts/MainLayout';
import useMovies from '../hooks/useMovies';

const MovieDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedMovie, loading, error, loadMovieById } = useMovies();

  useEffect(() => {
    loadMovieById(id);
  }, [id]);

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

  if (error) {
    return (
      <MainLayout>
        <Container>
          <Alert severity="error" sx={{ mt: 4 }}>
            {error}
          </Alert>
        </Container>
      </MainLayout>
    );
  }

  if (!selectedMovie) {
    return (
      <MainLayout>
        <Container>
          <Alert severity="warning" sx={{ mt: 4 }}>
            Movie not found
          </Alert>
        </Container>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Container>
        <Box sx={{ mt: 4, mb: 4 }}>
          <Button
            variant="outlined"
            onClick={() => navigate(-1)}
            sx={{ mb: 2 }}
          >
            Back to Movies
          </Button>

          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Paper
                elevation={3}
                sx={{
                  height: '100%',
                  overflow: 'hidden',
                  borderRadius: 2,
                }}
              >
                <img
                  src={selectedMovie.posterUrl}
                  alt={selectedMovie.title}
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                  }}
                />
              </Paper>
            </Grid>

            <Grid item xs={12} md={8}>
              <Typography variant="h4" gutterBottom>
                {selectedMovie.title}
              </Typography>

              <Box sx={{ mb: 2 }}>
                <Typography variant="h6" color="primary" gutterBottom>
                  Rating: {selectedMovie.rating}/10
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Duration: {selectedMovie.duration} minutes
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Release Date: {new Date(selectedMovie.releaseDate).toLocaleDateString()}
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Genres:
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {selectedMovie.genres?.map((genre) => (
                    <Chip
                      key={genre}
                      label={genre}
                      color="primary"
                      variant="outlined"
                    />
                  )) ?? []}
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Typography variant="h6" gutterBottom>
                Description
              </Typography>
              <Typography variant="body1" paragraph>
                {selectedMovie.description}
              </Typography>

              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Cast
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {selectedMovie.cast?.map((actor) => (
                    <Chip
                      key={actor}
                      label={actor}
                      variant="outlined"
                    />
                  )) ?? []}
                </Box>
              </Box>

              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Director
                </Typography>
                <Typography variant="body1">
                  {selectedMovie.director}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </MainLayout>
  );
};

export default MovieDetailsPage;