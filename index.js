require('dotenv').config();
const { connectDB } = require('./config/database')
const PORT =  process.env.PORT || 3001
const app = require('./app')

const server = app.listen(PORT, async () => {
  await connectDB(); 
  console.log('Server is running with express in port: ', PORT)
})

module.exports = server
