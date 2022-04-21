import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'

import Connection from './pages/Connection'

function App () {
  return (
    <div className="App">
      <div className="mb-5">
        <Navbar/>
      </div>
      <Routes>
        <Route path="/" element={<Connection/>}/>
      </Routes>
    </div>
  )
}

export default App
