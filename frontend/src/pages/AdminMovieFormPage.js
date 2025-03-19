import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  Paper,
  CircularProgress,
  Alert,
  Chip,
} from '@mui/material';
import MainLayout from '../layouts/MainLayout';
import useMovies from '../hooks/useMovies';

const AdminMovieFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    selectedMovie,
    loading,
    error,
    loadMovieById,
    handleCreateMovie,
    handleUpdateMovie,
  } = useMovies();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    director: '',
    releaseDate: '',
    duration: '',
    rating: '',
    genres: [],
    cast: [],
    posterUrl: '',
  });

  const [newGenre, setNewGenre] = useState('');
  const [newCast, setNewCast] = useState('');

  useEffect(() => {
    if (id) {
      loadMovieById(id);
    }
  }, [id]);

  useEffect(() => {
    if (selectedMovie) {
      setFormData({
        title: selectedMovie.title,
        description: selectedMovie.description,
        director: selectedMovie.director,
        releaseDate: selectedMovie.releaseDate.split('T')[0],
        duration: selectedMovie.duration,
        rating: selectedMovie.rating,
        genres: selectedMovie.genres,
        cast: selectedMovie.cast,
        posterUrl: selectedMovie.posterUrl,
      });
    }
  }, [selectedMovie]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddGenre = () => {
    if (newGenre && !formData.genres.includes(newGenre)) {
      setFormData((prev) => ({
        ...prev,
        genres: [...prev.genres, newGenre],
      }));
      setNewGenre('');
    }
  };

  const handleRemoveGenre = (genreToRemove) => {
    setFormData((prev) => ({
      ...prev,
      genres: prev.genres.filter((genre) => genre !== genreToRemove),
    }));
  };

  const handleAddCast = () => {
    if (newCast && !formData.cast.includes(newCast)) {
      setFormData((prev) => ({
        ...prev,
        cast: [...prev.cast, newCast],
      }));
      setNewCast('');
    }
  };

  const handleRemoveCast = (castToRemove) => {
    setFormData((prev) => ({
      ...prev,
      cast: prev.cast.filter((cast) => cast !== castToRemove),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await handleUpdateMovie(id, formData);
      } else {
        await handleCreateMovie(formData);
      }
      navigate('/admin/movies');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
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

  return (
    <MainLayout>
      <Container>
        <Box sx={{ mt: 4, mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            {id ? 'Edit Movie' : 'Add New Movie'}
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Paper sx={{ p: 3 }}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    multiline
                    rows={4}
                    required
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Director"
                    name="director"
                    value={formData.director}
                    onChange={handleChange}
                    required
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Release Date"
                    name="releaseDate"
                    type="date"
                    value={formData.releaseDate}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                    required
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Duration (minutes)"
                    name="duration"
                    type="number"
                    value={formData.duration}
                    onChange={handleChange}
                    required
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Rating (0-10)"
                    name="rating"
                    type="number"
                    value={formData.rating}
                    onChange={handleChange}
                    inputProps={{ min: 0, max: 10 }}
                    required
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Poster URL"
                    name="posterUrl"
                    value={formData.posterUrl}
                    onChange={handleChange}
                    required
                  />
                </Grid>

                <Grid item xs={12}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" gutterBottom>
                      Genres
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                      <TextField
                        size="small"
                        label="Add Genre"
                        value={newGenre}
                        onChange={(e) => setNewGenre(e.target.value)}
                      />
                      <Button
                        variant="outlined"
                        onClick={handleAddGenre}
                        disabled={!newGenre}
                      >
                        Add
                      </Button>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      {formData.genres.map((genre) => (
                        <Chip
                          key={genre}
                          label={genre}
                          onDelete={() => handleRemoveGenre(genre)}
                        />
                      ))}
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" gutterBottom>
                      Cast
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                      <TextField
                        size="small"
                        label="Add Cast Member"
                        value={newCast}
                        onChange={(e) => setNewCast(e.target.value)}
                      />
                      <Button
                        variant="outlined"
                        onClick={handleAddCast}
                        disabled={!newCast}
                      >
                        Add
                      </Button>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      {formData.cast.map((cast) => (
                        <Chip
                          key={cast}
                          label={cast}
                          onDelete={() => handleRemoveCast(cast)}
                        />
                      ))}
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                    <Button
                      variant="outlined"
                      onClick={() => navigate('/admin/movies')}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={loading}
                    >
                      {id ? 'Update Movie' : 'Create Movie'}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Box>
      </Container>
    </MainLayout>
  );
};

export default AdminMovieFormPage; 