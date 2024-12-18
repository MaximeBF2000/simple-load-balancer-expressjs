const express = require('express')
const app = express()

app.use(express.json())

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

app.get('/', async (req, res) => {
  console.log('Request received')
  await sleep(10_000)
  console.log('Request processed')
  res.json({ message: 'Hello, World!' })
})

// Start server
const PORT = process.argv[2]
if (!PORT) {
  console.error('Please provide a port number as a command line argument.')
  process.exit(1)
}

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
