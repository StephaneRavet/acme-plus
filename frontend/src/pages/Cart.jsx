import { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom'
import { useCallback } from 'react';

function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState({});

  const getCart = useCallback(async () => {
    return axios.get(`/user/basket`).then(res => setCart(res.data))
  }, [])

  useEffect(() => { getCart() }, [getCart])

  const onQuantityChange = useCallback(async (productId, quantity) => {
    await axios.post('/user/tobasket', { product: { productId, quantity } })
    await getCart()
  }, [getCart])

  const checkout = useCallback(async () => {
    await axios.get('/user/checkout')
    navigate('/')
  }, [navigate])

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
          {cart.products?.map((orderItem) => {
            return <tr key={orderItem.orderItemId}>
              <td>{orderItem.product.name}</td>
              <td className="text-center">{orderItem.price} €</td>
              <td className="text-center">
                <select onChange={event => onQuantityChange(orderItem.productId, event.target.value)} defaultValue={orderItem.quantity}>
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(value =>
                    <option value={value} key={value}>{value}</option>
                  )}
                </select>
              </td>
              <td className="text-end">{orderItem.total} €</td>
            </tr>
          }
          )}
        </tbody>
        <tfoot>
          <tr>
            <th colSpan="3" className='text-end'>Total prix de vente conseillé</th>
            <th className='text-end'>{cart.amount?.toFixed(2)} €</th>
          </tr>
          <tr>
            <th colSpan="3" className='text-end'>TMC 40%</th>
            <th className='text-end'>{cart.tmc?.toFixed(2)} €</th>
          </tr>
          <tr>
            <th colSpan="3" className='text-end'>TOTAL</th>
            <th className='text-end'>{cart.total?.toFixed(2)} €</th>
          </tr>
        </tfoot>
      </table>
      <div className='d-flex justify-content-between'>
        <NavLink to='/'>
          <button className='btn btn-primary'>Ajouter d'autres articles</button>
        </NavLink>
        <button className='btn btn-primary' onClick={checkout}>Valider mon panier</button>
      </div>
    </div >
  );
}

export default Cart;