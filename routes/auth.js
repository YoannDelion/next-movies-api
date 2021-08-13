import express from 'express'
import bcrypt from 'bcrypt'
import User from '../models/user.js'
import { validateRegisterData } from '../utils/validators.js'
const router = express.Router()

router.post('/register', async (req, res) => {

  const { errors, valid } = validateRegisterData(req.body)

  if (!valid) {
    res.status(400).json(errors)
  } else {
    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(req.body.password.trim(), salt)

    try {
      const user = new User({
        username: req.body.username.trim(),
        email: req.body.email.trim(),
        password: hashedPass
      })

      await user.save()

      const { password, ...userData } = user._doc

      res.status(201).json(userData)
    } catch (error) {
      res.status(500).json(error)
    }
  }
})

export default router