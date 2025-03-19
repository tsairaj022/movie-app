const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a movie title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide a movie description']
  },
  releaseDate: {
    type: Date,
    required: [true, 'Please provide a release date']
  },
  duration: {
    type: Number, // in minutes
    required: [true, 'Please provide movie duration']
  },
  rating: {
    type: Number,
    required: [true, 'Please provide a rating'],
    min: [0, 'Rating cannot be less than 0'],
    max: [10, 'Rating cannot be more than 10']
  },
  genre: {
    type: String,
    required: [true, 'Please provide a genre']
  },
  director: {
    type: String,
    required: [true, 'Please provide a director name']
  },
  cast: [{
    type: String
  }],
  posterUrl: {
    type: String,
    required: [true, 'Please provide a poster URL']
  },
  imdbId: {
    type: String,
    unique: true,
    required: [true, 'Please provide an IMDb ID']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt timestamp before saving
movieSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Index for search functionality
movieSchema.index({ title: 'text', description: 'text' });

module.exports = mongoose.model('Movie', movieSchema); 