import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Table, Button } from 'react-bootstrap';
import { getCart } from '../../data/orderData';
import { removeFromCart } from '../../data/productData';
import { useAuth } from '../../utils/context/authContext';

export default function ViewCart() {
  const [cart, setCart] = useState({});
  const { user } = useAuth();

  const onUpdate = () => {
    getCart(user[0].id).then(setCart);
  };
  useEffect(() => {
    onUpdate();
    console.warn(cart);
  }, [user]);

  const removeThisProductFromCart = (product) => {
    if (window.confirm('Remove this product from your cart?')) {
      removeFromCart(product.id, cart[0].id).then(() => onUpdate());
    }
  };

  if (!cart[0]?.products?.length) {
    return (
      <h5>No Products in Cart</h5>
    );
  }

  return (
    <>
      <h1>Hi, {user[0].username}. Here is your Cart!</h1>
      <h3>Total: ${cart[0].totalPrice}</h3>
      <Button><Link passHref href="/checkout">Checkout</Link></Button>
      <Table>
        <thead>
          <th>Product</th>
          <th>Seller</th>
          <th>Price</th>
          <th>Remove</th>
        </thead>
        <tbody>
          {cart[0].products?.map((product) => (
            <tr>
              <td>{product.name}</td>
              <td>{product.seller.username}</td>
              <td>${product.price}</td>
              <td><Button onClick={() => removeThisProductFromCart(product)}>Remove</Button></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
