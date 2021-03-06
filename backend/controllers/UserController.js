const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const db = require('../models/index')

function lineCalculate(productLine) {
  return parseInt(productLine.quantity) * parseFloat(productLine.price)
}

class UserController {
  constructor() {
    this.User = db.user
    this.Order = db.order
    this.OrderItem = db.orderitem
    this.Product = db.product
  }

  async getCart(userId) {
    const cart = await this.Order.findOne({ where: { userId, orderDatetime: null }, raw: true })
    if (cart) {
      const tmc = parseFloat((cart.amount * 0.4).toFixed(2))
      const total = cart.amount + tmc
      let orderItems = await this.OrderItem.findAll({
        where: { orderId: cart.orderId },
        include: this.Product,
      })
      orderItems = JSON.parse(JSON.stringify(orderItems))
      return {
        ...cart,
        products: orderItems.map(item => ({ ...item, total: item.price * item.quantity })),
        tmc,
        total
      }
    } else {
      return { products: [], amount: 0, tmc: 0, total: 0 }
    }
  }

  async toCart(userId, product) {
    // Recherche du produit demandé, dans la BDD
    const productExists = product?.productId && (await this.Product.findOne({ where: { productId: product.productId } })).toJSON()
    if (userId && productExists) {
      product = { ...product, ...productExists } // conserve la quantité, maj avec données DBB
      // Recherche du panier en cours ou création d'un nouveau
      // un panier est une commande non validée, donc sans orderDatetime
      const orderCart = await this.Order.findOne({ where: { userId, orderDatetime: null } }) ?? await this.Order.create({ userId, orderDatetime: null })
      const cart = orderCart.toJSON()
      // Recherche s'il y a déjà ce produit dans le panier
      const cartItem = await this.OrderItem.findOne({ where: { orderId: cart.orderId, productId: product.productId } })
      if (cartItem) {
        // S'il existe déjà -> mise à jour
        if (product.quantity > 0) {
          await cartItem.update({ quantity: product.quantity })
          await cartItem.save()
        } else {
          await cartItem.destroy()
        }
      } else {
        await this.OrderItem.create({ productId: product.productId, quantity: 1, price: product.price, orderId: cart.orderId })
      }
      // Mise à jour de order.price
      const cartItems = await this.OrderItem.findAll({ where: { orderId: cart.orderId } })
      const newPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
      await orderCart.update({ amount: newPrice })
      await orderCart.save()
    } else {
      throw new Error('Paramètres incorrects')
    }
  }

  async checkout(userId) {
    const cart = this.getCart()
    const order = await this.Order.create({ amount: cart.total, userId })
    for (const product of this.basket) {
      await this.OrderItem.create({
        orderId: order.orderId,
        productId: product.productId,
        price: product.price,
        quantity: product.quantity,
      })
    }
  }

  async orders() {
    return this.Order.findAll({ where: { userId: userId } })
  }

  async order(id) {
    return this.Order.findAll({
      where: { orderId: id },
    })
  }

  async profile(id) {
    return this.User.findOne({ where: { userId: id } })
  }

  async crud() {
    return this.User.findAll({})
  }

  async edit(id) {
    return this.User.findOne({ where: { userId: id } })
  }

  async delete(id) {
    await this.User.findOne({
      where: { userId: id },
    })
      .then((aUser) => {
        this.User.destroy({ where: { userId: id } })
          .then(() => {
            console.log(`-- User [${aUser.firstname} ${aUser.lastname}] effacé`)
          })
          .catch((err) => {
            console.error(`** User [${aUser.firstname} ${aUser.lastname}] non effacé`, err.message)
          })
      })
      .catch(() => {
        console.error(`** User ${id} non trouvé`)
      })
    return ['OK']
  }

  async save(req, res) {
    const data = req.body.data
    // let { surname, firstname, email, pwd, level, cmr } = data
    let { surname, pwd } = data
    console.log(`== userController save name: ${surname} ref: ${ref}`)
    bcrypt
      .hash(pwd, 10)
      .then(hash => this.#userCreate(data, hash))
      .catch((error) => res.status(500).json({ error }))
    return ['OK']
  }

  async #userCreate(data, hash) {
    await this.User.create({
      ...data,
      pwd: hash,
      pwdDatetime: Date.now(),
    })
  }

  async signin(req, res) {
    bcrypt
      .hash(req.body.password, 10)
      .then((hash) => {
        const user = new User({
          email: req.body.email,
          password: hash,
        })
        user
          .save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch((error) => res.status(400).json({ error }))
      })
      .catch((error) => res.status(500).json({ error }))
  }

  async login(req) {
    let status, message
    try {
      const user = await this.User.findOne({ where: { email: req.email } })
      if (!user) {
        status = 401
        message = { erreur: 'Utilisateur non trouvé !' }
      } else {
        const valid = await bcrypt.compare(req.password, user.pwd)
        if (valid === true) {
          status = 200
          message = {
            userId: user.userId,
            token: jwt.sign({ id: user.userId }, process.env.JWT_SECRET_KEY, { expiresIn: '3600s' }),
          }
        } else {
          status = 401
          message = { erreur: 'Mot de passe incorrect !' }
        }
      }
    } catch (error) {
      status = 500
      message = 'Erreur détectée: ' + error
    }
    return { status: status, retour: message }
  }

  async logout() {
    return { result: 'SUCCESS' }
  }

  async password_1() { }

  async password_2(data) {
    return this.User.findOne({ where: { email: data.email } })
  }

  async password_3() { }

  async password_4(data) {
    let { id, pwd } = data
    let aUser = await this.User.findOne({ where: { userId: id } })

    if (aUser) {
      console.log(`Modification mot de passe de ${aUser.surname}`)
      bcrypt
        .hash(pwd, 10)
        .then((hash) => {
          this.User.update({ pwd: hash, pwdDatetime: Date.now() }, { where: { userId: id } })
        })
        .catch((error) => res.status(500).json({ error }))
    }

    return ['OK']
  }
}

module.exports = UserController
