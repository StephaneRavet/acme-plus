const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
    req.userId = decodedToken.id
    if (req.body.userId && req.body.userId !== req.userId) {
      res.status(401).json({ error: 'Id non valable' })
    }
    next()
  } catch (error) {
    res.status(401).json({ error: error | 'non authentifié' })
  }
}
