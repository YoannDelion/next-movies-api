import express from 'express'
import dotenv from 'dotenv'
import moviesRoutes from './routes/movies.js'

dotenv.config()
const app = express()
app.use(express.json())

const port = process.env.PORT

app.use('/movies', moviesRoutes)

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})