import express from 'express'
import axios from 'axios'
const router = express.Router()

router.get('/popular', async (req, res) => {
  try {
    const { data } = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}&language=fr`)
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json(error.message)
  }
})

export default router