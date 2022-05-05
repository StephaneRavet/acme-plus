import React, { useCallback, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../context'
import axios from 'axios'

function Navbar (props) {
  const { context, dispatch } = useContext(Context)
  const logout = useCallback(async () => {
    try {
      await axios.get('/user/logout')
      axios.defaults.headers.common['Authorization'] = null
      dispatch({ type: 'logout' })
    } catch (error) {
      console.error(error)
    }
  }, [dispatch])
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">ACME Plus</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">Accueil</Link>
            </li>
          </ul>
        </div>
        <div className="d-flex">
          {
            context.user
              ? <div className="flex-align-center">
                {context.user}
                <button onClick={logout} className="btn btn-link">Déconnexion</button>
              </div>
              : <Link to="/login">Connexion</Link>
          }
        </div>
      </div>
    </nav>
  )
}

export default Navbar
