const teste = require('./teste')
const dynamicRoutes = [
  {
    type: 'GET',
    entryPoint: '/',
    function: teste
  }
]
const staticRoutes = []
module.exports = {
  dynamics: dynamicRoutes,
  statics: staticRoutes
}
