require('dotenv').config()

const app = require('./src/app')
const connectDb = require('./src/db/db')

const port = Number.parseInt(process.env.PORT, 10) || 3000

connectDb()

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
