import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ProductCard from '../components/ProductCard'

function ProductCollection (props) {
  const [productsByCategories, setProductsByCategories] = useState([])
  useEffect(() => {
    axios.get('/product/collection').then(res => setProductsByCategories(res.data))
  }, [])
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
                  <ProductCard product={product}/>
                </div>)}
            </div>
          </div>
        </div>,
      )}
    </div>
  )
}

export default ProductCollection
