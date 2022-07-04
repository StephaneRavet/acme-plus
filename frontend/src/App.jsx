import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import './App.css'

import Login from './pages/Login'
import ProductCollection from './pages/ProductCollection'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'

function App() {
  return (
    <div className="">
      <div className="mb-5">
        <Navbar />
      </div>
      <div className="container">
        <Routes>
          <Route path="/" element={<ProductCollection />} />
          <Route path="/login" element={<Login />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
