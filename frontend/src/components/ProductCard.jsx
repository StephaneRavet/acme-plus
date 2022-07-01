import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

function ProductCard({ product }) {
  return (
    <NavLink to={`/product/${product.productId}`} className="card">
      <img src={`../assets/img/products/product_${product.productId}.jpg`} className="card-img-top" alt="" />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">
          Référence : {product.ref}<br />
          Prix : {product.price}
        </p>
        {/*<Link href="#" className="btn btn-primary">Go somewhere</Link>*/}
      </div>
    </NavLink>
  )
}

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
}

export default ProductCard
