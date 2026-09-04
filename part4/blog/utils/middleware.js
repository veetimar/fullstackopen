logger = require('./logger')

const errorHandler = (error, req, res, next) => {
  if (error.name === 'ValidationError') {
    return res.status(400).end()
  }

  next(error)
}

module.exports = {errorHandler}
