import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ProductCard from '../components/ProductCard'
import { useNavigate } from 'react-router-dom'

function ProductCollection() {
  const [productsByCategories, setProductsByCategories] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    if (!axios.defaults.headers.common.Authorization) {
      return navigate('/login')
    }
    axios.get('/product/collection').then(res => setProductsByCategories(res.data))
  }, [navigate])
  return (
    <div>
      <h1>Produits par catégories</h1>
      {productsByCategories.map((cat) =>
        <div key={'cat' + cat.categoryId}>
          <h2>{cat.name}</h2>
          <div className="container mt-3">
            <div className="row">
              {cat.products.map(product =>
                <div className="col-3 mb-3" key={'product' + product.productId}>
                  <ProductCard product={product} />
                </div>)}
            </div>
          </div>
        </div>,
      )}
    </div>
  )
}

export default ProductCollection
