import { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom'

function Cart() {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    axios.get(`/user/basket`).then(res => {
      setProducts(res.data.products)
      setTotal(res.data.total)
    })
  }, [])
  return (
    <div>

      <h5 className="mb-3">
        <NavLink to="/">Produits</NavLink> &gt; Panier
      </h5>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Produit</th>
            <th scope="col" className='text-center'>Prix unitaire</th>
            <th scope="col" className='text-center'>Quantité</th>
            <th scope="col" className="text-end">Total</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            return <tr key={product.id}>
              <td>{product.name}</td>
              <td className="text-center">{product.price} €</td>
              <td className="text-center">{product.quantity}</td>
              <td className="text-end">{product.total} €</td>
            </tr>
          }
          )}
        </tbody>
        <tr>
          <td colspan="4" className='text-end'>
            <strong>{total} €</strong>
          </td>
        </tr>
      </table>
    </div >
  );
}

export default Cart;