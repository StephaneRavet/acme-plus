import { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom'
import { useCallback } from 'react';

function Cart() {
  const [cart, setCart] = useState({});

  const getCart = useCallback(async () => {
    return axios.get(`/user/basket`).then(res => {
      setCart(res.data)
    })
  }, [])

  useEffect(() => { getCart() }, [getCart])

  const onQuantityChange = useCallback(async (productId, quantity) => {
    await axios.patch('/user/basket', { product: { productId, quantity } })
    await getCart()
  }, [getCart])
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
          {cart.products?.map((product) => {
            return <tr key={product.id}>
              <td>{product.name}</td>
              <td className="text-center">{product.price} €</td>
              <td className="text-center">
                <select onChange={event => onQuantityChange(product.productId, event.target.value)} defaultValue={product.quantity}>
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((value, index) =>
                    <option value={value} key={index}>{value}</option>
                  )}
                </select>
              </td>
              <td className="text-end">{product.total.toFixed(2)} €</td>
            </tr>
          }
          )}
        </tbody>
        <tfoot>
          <tr>
            <th colSpan="3" className='text-end'>Total prix de vente conseillé</th>
            <th className='text-end'>{cart.price?.toFixed(2)} €</th>
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
    </div >
  );
}

export default Cart;