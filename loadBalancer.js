const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')
const app = express()

// Define the ports for our backend servers
const backends = [
  'http://localhost:5001',
  'http://localhost:5002',
  'http://localhost:5003'
]

let currentBackend = 0

// Custom router function for round-robin load balancing
const balancer = req => {
  // Get the next backend
  const target = backends[currentBackend]

  // Update the counter for the next request
  currentBackend = (currentBackend + 1) % backends.length

  return target
}

// Create proxy middleware
const proxy = createProxyMiddleware({
  target: backends[0], // Default target (will be overridden)
  router: balancer,
  changeOrigin: true,
  ws: true, // Enable WebSocket proxying
  logLevel: 'debug'
})

// Use the proxy middleware for all requests
app.use('/', proxy)

// Start the load balancer
const PORT = 5005
app.listen(PORT, () => {
  console.log(`Load balancer is running on http://localhost:${PORT}`)
  console.log('Distributing requests to:', backends.join(', '))
})
