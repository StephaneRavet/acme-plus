import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'

import Connection from './pages/Connection'
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
          <Route path="/login" element={<Connection/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App
