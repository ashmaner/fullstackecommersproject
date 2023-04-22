const express = require('express')
const { errorHandler } = require('./middlewares/errorMiddleware')
require('colors')
const products = require('./data/products')
const dotenv = require('dotenv')
const connectDb = require('./config/config')
const productRoutes = require('./routes/productsRoute')
const usersRoutes = require('./routes/UsersRoute')
const orderRoutes = require('./routes/orderRoute')
const path = require('path')

dotenv.config()
//connecting to mongodb database
connectDb()
const app = express()
//middleware bodyparser
app.use(express.json())

//dotenv config
app.get('/', (req, res) => {
  res.send('<h1>Welcome to Node Server</h1>')
})

app.use('/', productRoutes)
app.use('/users', usersRoutes)
app.use('/orders', orderRoutes)
app.get('/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID)
})

app.use(errorHandler)
app.use(express.static(path.join(__dirname, './frontend/build')))

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, './frontend/build/index.html'))
})

const port = 8080
app.listen(process.env.PORT || port, () => {
  console.log(
    `Server Running in ${process.env.NODE_ENV} Mode on Port ${process.env.PORT}`
      .inverse,
  )
})
