import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  fetchMovies,
  fetchMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
  clearError,
  clearSelectedMovie,
} from '../features/movies/movieSlice';

const useMovies = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { movies, selectedMovie, loading, error, totalPages, currentPage } =
    useSelector((state) => state.movies);

  useEffect(() => {
    return () => {
      dispatch(clearSelectedMovie());
    };
  }, [dispatch]);

  const loadMovies = async (params = { page: 1, limit: 10, sort: 'title' }) => {
    try {
      await dispatch(fetchMovies(params)).unwrap();
    } catch (error) {
      console.error('Failed to fetch movies:', error);
    }
  };

  const loadMovieById = async (id) => {
    try {
      await dispatch(fetchMovieById(id)).unwrap();
    } catch (error) {
      console.error('Failed to fetch movie:', error);
      navigate('/');
    }
  };

  const handleCreateMovie = async (movieData) => {
    try {
      await dispatch(createMovie(movieData)).unwrap();
      navigate('/admin/movies');
    } catch (error) {
      console.error('Failed to create movie:', error);
    }
  };

  const handleUpdateMovie = async (id, movieData) => {
    try {
      await dispatch(updateMovie({ id, movieData })).unwrap();
      navigate('/admin/movies');
    } catch (error) {
      console.error('Failed to update movie:', error);
    }
  };

  const handleDeleteMovie = async (id) => {
    try {
      await dispatch(deleteMovie(id)).unwrap();
      navigate('/admin/movies');
    } catch (error) {
      console.error('Failed to delete movie:', error);
    }
  };

  const clearMovieError = () => {
    dispatch(clearError());
  };

  return {
    movies,
    selectedMovie,
    loading,
    error,
    totalPages,
    currentPage,
    loadMovies,
    loadMovieById,
    createMovie: handleCreateMovie,
    updateMovie: handleUpdateMovie,
    deleteMovie: handleDeleteMovie,
    clearError: clearMovieError,
  };
};

export default useMovies; 