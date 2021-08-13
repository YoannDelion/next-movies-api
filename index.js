import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import moviesRoutes from './routes/movies.js'
import authRoutes from './routes/auth.js'

dotenv.config()
const app = express()

const port = process.env.PORT

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(console.log('Connected to MongoDB'))
  .catch(error => console.log(error))

app.use(express.json())
app.use(cors({
  origin: 'http://localhost:3000'
}))

app.use('/movies', moviesRoutes)
app.use('/auth', authRoutes)

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})