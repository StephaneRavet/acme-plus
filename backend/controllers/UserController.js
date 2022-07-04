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
    this.basket = []
  }

  async tobasket(product) {
    if (product) {
      const alreadyExist = this.basket.find(p => product.productId === p.productId)
      if (alreadyExist) {
        const index = this.basket.findIndex(p => p.productId === product.productId);
        this.basket[index].quantity++
        this.basket[index].total = lineCalculate(this.basket[index])
      } else {
        this.basket.push({
          ...product,
          quantity: 1,
          total: product.price
        })
      }
    }
  }

  async getBasket() {
    return {
      products: this.basket,
      total: this.basket.reduce((acc, p) => acc + p.total, 0)
    }
  }

  async updateBasket(product) {
    if (product) {
      const alreadyExist = this.basket.find(p => product.productId == p.productId)
      if (alreadyExist) {
        const index = this.basket.findIndex(p => p.productId == product.productId);
        if (product.quantity == '0') {
          this.basket.splice(index, 1)
        } else {
          this.basket[index].quantity = product.quantity
          this.basket[index].total = lineCalculate(this.basket[index])
        }
      }
    }
  }


  async checkout() {
    return ['OK']
  }

  async orders() {
    return this.Order.findAll({
      where: { userId: userId },
    })
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
            console.log(`** User [${aUser.firstname} ${aUser.lastname}] non effacé`, err.message)
          })
      })
      .catch(() => {
        console.log(`** User ${id} non trouvé`)
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
