class AppController {
  home(res) {
    res.redirect('/product/collection')
  }

  error_404(res) {
    res.status(404).send('API inexistant')
  }
}

module.exports = AppController
