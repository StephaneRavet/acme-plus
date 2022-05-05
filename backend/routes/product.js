const express = require('express')
const router = express.Router()
const authentification = require('../middleware/auth')

module.exports = (params) => {
  const { db, productController } = params

  router.get('/collection', authentification, async (req, res) => {
    const data = await productController.collection()
    res.json(data)
  })

  router.get('/detail/:productId', authentification, async (req, res) => {
    const data = await productController.detail(req.params.productId)
    res.json(data)
  })

  router.get('/crud', authentification, async (req, res) => {
    const data = await productController.list(req.params.productId)
    res.json(data)
  })

  router.get('/edit/:productId?', authentification, async (req, res) => {
    if (typeof req.params.productId !== 'undefined') {
      var id = req.params.productId
    } else {
      var id = null
    }

    const data = await productController.edit(id)
    res.json(data)
  })

  router.get('/delete/:productId/all', authentification, async (req, res) => {
    const data = await productController.delete(req.params.productId, 'all')
    res.json(data)
  })

  router.get('/delete/:productId/img', authentification, async (req, res) => {
    const data = await productController.delete(req.params.productId, 'img')
    res.json(data)
  })

  router.post('/save', authentification, async (req, res) => {
    const data = await productController.save(req.body)
    res.json(data)
  })

  return router
}
