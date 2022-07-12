const config = require('../config/db.config.js')
const Sequelize = require('sequelize')

const db = {}

const logging = config.LOG === 'true' ? true : false

// Utilisation Serveur MySQL
const database = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  logging: logging, // true pour avoir le détail des requêtes SQL
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
})

// SQLite plus facile pour les tests
// const database = new Sequelize('sqlite::memory:');

db.Sequelize = Sequelize
db.sequelize = database

db.product = require('../models/Product.js')(database, Sequelize.DataTypes)
db.category = require('../models/Category.js')(database, Sequelize.DataTypes)
db.user = require('../models/User.js')(database, Sequelize.DataTypes)
db.order = require('../models/Order.js')(database, Sequelize.DataTypes)
db.orderitem = require('./OrderItem.js')(database, Sequelize.DataTypes)

// Ajout des relations
db.order.belongsTo(db.user, { foreignKey: 'userId' });
db.orderitem.belongsTo(db.order, { foreignKey: 'orderId' });
db.orderitem.belongsTo(db.product, { foreignKey: 'productId' });
db.product.belongsTo(db.category, { foreignKey: 'categoryId' })

module.exports = db
