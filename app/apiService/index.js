const express = require('express')
const app = express()
const routes = require('./routes')

function startServer () {
  routes.dynamics.forEach(route => {
    switch (route.type.toUpperCase()) {
      case 'GET':
        app.get(route.entryPoint, route.function)
        break
      case 'PUT':
        app.put(route.entryPoint, route.function)
        break
      case 'POST':
        app.post(route.entryPoint, route.function)
        break
      case 'DELETE':
        app.delete(route.entryPoint, route.function)
        break
      case 'OPTIONS':
        app.options(route.entryPoint, route.function)
        break
    }
  })

  app.listen(process.env.PORT, function () {
    console.log(`REST API Up on port ${process.env.PORT}!`)
  })
}

module.exports = {
  startServer
}
