const express = require('express')
const router = express.Router()
const authentification = require('../middleware/auth')

module.exports = (params) => {
  const { userController } = params

  router.post('/tobasket', authentification, async (req, res) => {
    const data = await userController.tobasket(req.body.product)
    res.json(data)
  })

  router.get('/basket', authentification, async (req, res) => {
    const data = await userController.getBasket()
    res.json(data)
  })

  router.patch('/basket', authentification, async (req, res) => {
    const data = await userController.updateBasket(req.body.product)
    res.json(data)
  })

  router.get('/checkout', authentification, async (req, res) => {
    const data = await userController.checkout()
    res.json(data)
  })

  router.get('/orders', authentification, async (req, res) => {
    const data = await userController.orders()
    res.json(data)
  })

  router.get('/order/:orderId', authentification, async (req, res) => {
    const data = await userController.order(req.params.orderId)
    res.json(data)
  })

  router.get('/profile', authentification, async (req, res) => {
    const data = await userController.profile(req.userId)
    res.json(data)
  })

  router.get('/crud', authentification, async (req, res) => {
    const data = await userController.crud()
    res.json(data)
  })

  router.get('/edit', authentification, async (req, res) => {
    const data = await userController.edit()
    res.json(data)
  })

  router.get('/edit/:userId', authentification, async (req, res) => {
    const data = await userController.edit(req.params.userId)
    res.json(data)
  })

  router.get('/delete/:userId', authentification, async (req, res) => {
    const data = await userController.delete(req.params.userId)
    res.json(data)
  })

  router.post('/save', authentification, async (req, res) => {
    const data = await userController.save()
    res.json(data)
  })

  router.get('/signin', async (req, res) => {
    const data = await userController.signin()
    res.json(data)
  })

  router.post('/login', async (req, res) => {
    const data = await userController.login(req.body)
    res.status(data.status).json(data.retour)
  })

  router.get('/logout', authentification, async (req, res) => {
    const data = await userController.logout()
    res.json(data)
  })

  router.get('/password_1', async (req, res) => {
    const data = await userController.password_1()
    res.json(data)
  })

  router.post('/password_2', async (req, res) => {
    const data = await userController.password_2(req.body)
    res.json(data)
  })

  router.get('/password_3', async (req, res) => {
    const data = await userController.password_3()
    res.json(data)
  })

  router.post('/password_4', async (req, res) => {
    const data = await userController.password_4(req.body)
    res.json(data)
  })

  return router
}
