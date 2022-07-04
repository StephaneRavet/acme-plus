import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams()
  const [product, setProduct] = useState({})
  useEffect(() => {
    axios.get(`/product/detail/${id}`).then(res => setProduct(res.data), [])
  }, [id])
  return <div>
    {
      !product.name ?
        <div className='text-center'>Aucun produit</div> :
        <div>
          <h2 class="display-6">
            <NavLink to="/">Produits</NavLink> &gt; {product.category.name}
          </h2>
          <div className="row" id="detailProduct">
            <div className="col-5 col-xs-6 col-sm-7 col-md-8 d-flex align-items-center">
              <img src={`/assets/img/products/product_${product.productId}.jpg`} alt={product.name} className="img-fluid" />
            </div>
            <div className='col-7 col-xs-6 col-sm-5 col-md-4'>
              <div className="price">{product.price}€</div>
              <div className="category">catégorie<br />
                {product.category.name}</div>
              <div className="ref">référence<br />
                {product.ref}</div>
              <div className="size">Pointure
                <select className='form-select'>
                  <option>35</option>
                  <option>35½</option>
                  <option>36</option>
                  <option>36½</option>
                  <option>37</option>
                  <option>37½</option>
                  <option>38</option>
                  <option>38½</option>
                  <option>39</option>
                  <option>39½</option>
                  <option>40</option>
                  <option>40½</option>
                  <option>41</option>
                  <option>41½</option>
                  <option>42</option>
                  <option>42½</option>
                  <option>43</option>
                  <option>43½</option>
                  <option>44</option>
                  <option>44½</option>
                  <option>45</option>
                </select>
              </div>
              <div className="width">Largeur
                <select className="form-select">
                  <option>S</option>
                  <option>M</option>
                  <option>L</option>
                </select>
              </div>
              <div className="d-grid">
                <button className="btn btn-primary">Ajouter au panier</button>
              </div>
            </div>
          </div>
        </div>
    }
  </div>
}

export default ProductDetail;