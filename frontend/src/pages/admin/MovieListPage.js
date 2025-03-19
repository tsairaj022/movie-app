import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { fetchMovies, deleteMovie } from '../../features/movies/movieSlice';
import MainLayout from '../../layouts/MainLayout';

const MovieListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { movies, loading, error } = useSelector((state) => state.movies);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    dispatch(fetchMovies({ page: 1, limit: 100 }));
  }, [dispatch]);

  const handleEdit = (movie) => {
    navigate(`/admin/movies/${movie._id}/edit`);
  };

  const handleDeleteClick = (movie) => {
    setSelectedMovie(movie);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedMovie) {
      await dispatch(deleteMovie(selectedMovie._id));
      setDeleteDialogOpen(false);
      setSelectedMovie(null);
    }
  };

  const handleAddNew = () => {
    navigate('/admin/movies/new');
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
        <Box sx={{ mt: 4, mb: 4 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 3,
            }}
          >
            <Typography variant="h4">Manage Movies</Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddNew}
            >
              Add New Movie
            </Button>
          </Box>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Rating</TableCell>
                  <TableCell>Release Date</TableCell>
                  <TableCell>Duration</TableCell>
                  <TableCell>Genre</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {movies.map((movie) => (
                  <TableRow key={movie._id}>
                    <TableCell>{movie.title}</TableCell>
                    <TableCell>{movie.rating}/10</TableCell>
                    <TableCell>
                      {new Date(movie.releaseDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{movie.duration} min</TableCell>
                    <TableCell>{movie.genre}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        color="primary"
                        onClick={() => handleEdit(movie)}
                        size="small"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteClick(movie)}
                        size="small"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <Dialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
        >
          <DialogTitle>Delete Movie</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete "{selectedMovie?.title}"? This action
              cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
            <Button
              onClick={handleDeleteConfirm}
              color="error"
              variant="contained"
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </MainLayout>
  );
};

export default MovieListPage; 