import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
  CircularProgress,
  Alert,
} from '@mui/material';
import MainLayout from '../layouts/MainLayout';
import useMovies from '../hooks/useMovies';
import debounce from 'lodash/debounce';

const HomePage = () => {
  const navigate = useNavigate();
  const {
    movies,
    loading,
    error,
    totalPages,
    currentPage,
    loadMovies,
    clearError,
  } = useMovies();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('title');

  // Create a stable debounced search function
  const debouncedSearch = useCallback(
    debounce((query) => {
      loadMovies({ page: 1, sort: sortBy, search: query });
    }, 500),
    [sortBy, loadMovies]
  );

  // Handle initial load and sort changes
  useEffect(() => {
    if (!searchQuery.trim()) {
      loadMovies({ page: currentPage, sort: sortBy });
    }
  }, [currentPage, sortBy]);

  // Handle search changes
  useEffect(() => {
    if (searchQuery.trim()) {
      debouncedSearch(searchQuery);
    } else {
      loadMovies({ page: 1, sort: sortBy });
    }
  }, [searchQuery]);

  const handlePageChange = (event, value) => {
    loadMovies({ page: value, sort: sortBy, search: searchQuery });
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleMovieClick = (movieId) => {
    navigate(`/movies/${movieId}`);
  };

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

  return (
    <MainLayout>
      <Container>
        <Box sx={{ mb: 4 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Search movies"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search by title, description, or genre..."
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Sort by</InputLabel>
                <Select value={sortBy} label="Sort by" onChange={handleSortChange}>
                  <MenuItem value="title">Title</MenuItem>
                  <MenuItem value="rating">Rating</MenuItem>
                  <MenuItem value="releaseDate">Release Date</MenuItem>
                  <MenuItem value="duration">Duration</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>

        <Grid container spacing={3}>
          {movies?.map((movie) => (
            <Grid item key={movie._id} xs={12} sm={6} md={4} lg={3}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    transition: 'transform 0.2s ease-in-out',
                  },
                }}
                onClick={() => handleMovieClick(movie._id)}
              >
                <CardMedia
                  component="img"
                  height="300"
                  image={movie.posterUrl}
                  alt={movie.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="h2">
                    {movie.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {movie.description.substring(0, 100)}...
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Rating: {movie.rating}/10
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {movies?.length > 0 && (
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              size="large"
            />
          </Box>
        )}
      </Container>
    </MainLayout>
  );
};

export default HomePage; 