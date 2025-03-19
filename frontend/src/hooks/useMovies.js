import { useState, useCallback } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const useMovies = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const loadMovies = useCallback(async (page = 1, search = '', sort = 'rating') => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${API_URL}/movies`, {
        params: {
          page,
          limit: 12,
          search: search.trim(),
          sort,
        },
      });
      setMovies(response.data.movies);
      setTotalPages(response.data.totalPages);
      setCurrentPage(page);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load movies');
    } finally {
      setLoading(false);
    }
  }, []);

  const loadMovieById = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${API_URL}/movies/${id}`);
      setSelectedMovie(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load movie details');
    } finally {
      setLoading(false);
    }
  }, []);

  const addMovie = useCallback(async (movieData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post(`${API_URL}/movies`, movieData);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add movie');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateMovie = useCallback(async (id, movieData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.put(`${API_URL}/movies/${id}`, movieData);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update movie');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteMovie = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      await axios.delete(`${API_URL}/movies/${id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete movie');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    movies,
    selectedMovie,
    loading,
    error,
    totalPages,
    currentPage,
    loadMovies,
    loadMovieById,
    addMovie,
    updateMovie,
    deleteMovie,
    clearError,
  };
};

export default useMovies; 