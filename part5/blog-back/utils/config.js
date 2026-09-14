require('dotenv').config()

const PORT = process.env.PORT
const MONGOURL = process.env.NODE_ENV === 'test' 
  ? process.env.TEST_MONGOURL
  : process.env.MONGOURL

module.exports = { PORT, MONGOURL }
