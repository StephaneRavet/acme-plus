const express = require('express')
const router = express.Router()

module.exports = (params) => {
  const { appController } = params

  router.all('/', (req, res) => {
    appController.home(res)
  })

  router.all('/error_404', (req, res) => {
    appController.error_404(res)
  })

  return router
}
