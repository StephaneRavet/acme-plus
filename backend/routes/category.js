const express = require('express')
const router = express.Router()
const authentification = require('../middleware/auth')

module.exports = (params) => {
  const { categoryController } = params

  router.get('/crud', async (req, res) => {
    const data = await categoryController.list()
    res.json(data)
  })

  router.get('/edit/:categoryId?', authentification, async (req, res) => {
    if (typeof req.params.categoryId !== 'undefined') {
      var id = req.params.categoryId
    } else {
      var id = null
    }

    const data = await categoryController.edit(id)
    res.json(data)
  })

  router.get('/delete/:categoryId', authentification, async (req, res) => {
    const data = await categoryController.delete(req.params.categoryId)
    res.json(data)
  })

  router.post('/save', authentification, async (req, rep) => {
    let data = await categoryController.save(req.body)
    rep.json(data)
  })

  return router
}
