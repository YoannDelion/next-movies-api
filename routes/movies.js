import axios from 'axios'
import express from 'express'
import Favorite from '../models/favorite.js'
import { checkAuth } from '../utils/checkAuth.js'

const router = express.Router()

router.get('/popular', async (req, res) => {
  try {
    const { data } = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}&language=fr`)
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json(error.message)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${req.params.id}?api_key=${process.env.TMDB_API_KEY}&language=fr`)
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json(error.message)
  }
})

router.post('/:id/toggleFavorite', checkAuth, async (req, res) => {
  const userId = req.user.userId
  const movieId = req.params.id

  try {
    const favorite = await Favorite.findOne({ userId, movieId })

    if (favorite) {
      await favorite.delete()
      res.status(200).json(`Movie ${movieId} removed from user ${userId} favorites`)
    } else {
      const newFavorite = new Favorite({ userId, movieId })

      await newFavorite.save()
      res.status(201).json(newFavorite)
    }
  } catch (error) {
    res.status(200).json(error.message)
  }
})

export default router