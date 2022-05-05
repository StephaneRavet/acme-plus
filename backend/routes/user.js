const express = require('express')
const router = express.Router()

module.exports = (params) => {
  const { db, userController } = params

  router.post('/tobasket', async (req, res) => {
    console.log(req)
    const data = await userController.tobasket(req.body)
    res.json(data)
  })

  router.get('/basket', async (req, res) => {
    const data = await userController.basket()
    res.json(data)
  })

  router.get('/checkout', async (req, res) => {
    const data = await userController.checkout()
    res.json(data)
  })

  router.get('/orders', async (req, res) => {
    const data = await userController.orders()
    res.json(data)
  })

  router.get('/order/:orderId', async (req, res) => {
    const data = await userController.order(req.params.orderId)
    res.json(data)
  })

  router.get('/profile', async (req, res) => {
    const data = await userController.profile()
    res.json(data)
  })

  router.get('/crud', async (req, res) => {
    const data = await userController.crud()
    res.json(data)
  })

  router.get('/edit', async (req, res) => {
    const data = await userController.edit()
    res.json(data)
  })

  router.get('/edit/:userId', async (req, res) => {
    const data = await userController.edit(req.params.userId)
    res.json(data)
  })

  router.get('/delete/:userId', async (req, res) => {
    const data = await userController.delete(req.params.userId)
    res.json(data)
  })

  router.post('/save', async (req, res) => {
    const data = await userController.save()
    res.json(data)
  })

  router.get('/signin', async (req, res) => {
    const data = await userController.signin()
    res.json(data)
  })

  router.post('/login', async (req, res, next) => {
    await userController.login(req, res)
  })

  router.get('/logout', async (req, res) => {
    const data = await userController.logout(request.session.userId)
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
    await userController.password_3(req, res)
  })

  router.post('/password_4', async (req, res) => {
    await userController.password_4(req, res)
  })

  return router
}
