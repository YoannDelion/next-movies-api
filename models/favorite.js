import mongoose from 'mongoose'

const favoriteSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  movieId: {
    type: Number,
    required: true
  }
},
  {
    timestamps: true
  }
)

export default new mongoose.model('Favorite', favoriteSchema)