const express = require('express');
const router = express.Router();
const {
  getMovies,
  searchMovies,
  addMovie,
  updateMovie,
  deleteMovie,
  getMovieById
} = require('../controllers/movieController');
const { protect, authorize } = require('../middleware/auth');

// Public routes
router.get('/', getMovies);
router.get('/search', searchMovies);
router.get('/:id', getMovieById);

// Protected routes (admin only)
router.post('/', protect, authorize('admin'), addMovie);
router.put('/:id', protect, authorize('admin'), updateMovie);
router.delete('/:id', protect, authorize('admin'), deleteMovie);

module.exports = router; 