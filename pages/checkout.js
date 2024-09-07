import { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import { getCart } from '../data/orderData';
import CheckoutForm from '../components/CheckoutForm';

export default function Checkout() {
  const { user } = useAuth();
  const [cart, setCart] = useState({});
  const [loading, setLoading] = useState(true);

  const onUpdate = () => {
    getCart(user[0].id).then(setCart);
  };
  useEffect(() => {
    onUpdate();
    console.warn(cart[0]);
    setLoading(false);
  }, [user]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (cart) {
    return <CheckoutForm orderId={cart.id} />;
  }

  return <h2>No results</h2>;
}
