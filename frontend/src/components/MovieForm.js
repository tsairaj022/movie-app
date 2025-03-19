import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Typography,
  Paper,
  Alert,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createMovie, updateMovie } from '../features/movies/movieSlice';

const MovieForm = ({ movieId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedMovie, loading, error } = useSelector((state) => state.movies);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    releaseDate: '',
    duration: '',
    rating: '',
    genres: [], // Initialize as empty array
    cast: [], // Initialize as empty array
    director: '',
    posterUrl: '',
  });
  const [newGenre, setNewGenre] = useState('');
  const [newCastMember, setNewCastMember] = useState('');

  useEffect(() => {
    if (movieId && selectedMovie) {
      setFormData({
        title: selectedMovie.title || '',
        description: selectedMovie.description || '',
        releaseDate: selectedMovie.releaseDate ? selectedMovie.releaseDate.split('T')[0] : '',
        duration: selectedMovie.duration || '',
        rating: selectedMovie.rating || '',
        genres: selectedMovie.genres || [], // Provide default empty array
        cast: selectedMovie.cast || [], // Provide default empty array
        director: selectedMovie.director || '',
        posterUrl: selectedMovie.posterUrl || '',
      });
    }
  }, [movieId, selectedMovie]);

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

  const handleAddCastMember = () => {
    if (newCastMember && !formData.cast.includes(newCastMember)) {
      setFormData((prev) => ({
        ...prev,
        cast: [...prev.cast, newCastMember],
      }));
      setNewCastMember('');
    }
  };

  const handleRemoveCastMember = (memberToRemove) => {
    setFormData((prev) => ({
      ...prev,
      cast: prev.cast.filter((member) => member !== memberToRemove),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const movieData = {
      ...formData,
      duration: parseInt(formData.duration),
      rating: parseFloat(formData.rating),
    };

    if (movieId) {
      await dispatch(updateMovie({ id: movieId, movieData }));
    } else {
      await dispatch(createMovie(movieData));
    }

    if (!error) {
      navigate('/admin/movies');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            multiline
            rows={4}
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            required
            fullWidth
            type="date"
            label="Release Date"
            name="releaseDate"
            value={formData.releaseDate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            required
            fullWidth
            type="number"
            label="Duration (minutes)"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            InputProps={{ inputProps: { min: 1 } }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            required
            fullWidth
            type="number"
            label="Rating (0-10)"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            InputProps={{ inputProps: { min: 0, max: 10, step: 0.1 } }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            required
            fullWidth
            label="Director"
            name="director"
            value={formData.director}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="Poster URL"
            name="posterUrl"
            value={formData.posterUrl}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
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
              {formData.genres?.map((genre) => (
                <Chip
                  key={genre}
                  label={genre}
                  onDelete={() => handleRemoveGenre(genre)}
                />
              ))}
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Cast Members
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
              <TextField
                size="small"
                label="Add Cast Member"
                value={newCastMember}
                onChange={(e) => setNewCastMember(e.target.value)}
              />
              <Button
                variant="outlined"
                onClick={handleAddCastMember}
                disabled={!newCastMember}
              >
                Add
              </Button>
            </Box>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {formData.cast?.map((member) => (
                <Chip
                  key={member}
                  label={member}
                  onDelete={() => handleRemoveCastMember(member)}
                />
              ))}
            </Box>
          </Paper>
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
              {loading ? 'Saving...' : movieId ? 'Update Movie' : 'Create Movie'}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MovieForm;