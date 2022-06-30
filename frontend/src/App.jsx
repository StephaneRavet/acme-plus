import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'

import Login from './pages/Login'
import ProductCollection from './pages/ProductCollection'

function App () {
  return (
    <div className="App">
      <div className="mb-5">
        <Navbar/>
      </div>
      <div className="container">
        <Routes>
          <Route path="/" element={<ProductCollection/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App
