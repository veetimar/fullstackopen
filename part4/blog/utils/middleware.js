const jwt = require('jsonwebtoken')
const logger = require('./logger')
const User = require('../models/user')

const errorHandler = (error, req, res, next) => {
  logger.error(error)

  if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    return res.status(400).json({ error: 'username must be unique' })
  } else if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'token invalid' })
  }

  next(error)
}

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    req.token = authorization.replace('Bearer ', '')
  }

  next()
}

const userExtractor = async (req, res, next) => {
  const userFromToken = jwt.verify(req.token, process.env.SECRET)
  if (!userFromToken.id) {
    throw new jwt.JsonWebTokenError('No id found')
  }
  req.user = await User.findById(userFromToken.id)

  next()
}

module.exports = {errorHandler, tokenExtractor, userExtractor}
