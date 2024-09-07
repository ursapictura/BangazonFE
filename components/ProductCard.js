import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';
import { addToCart } from '../data/productData';
import { getCart } from '../data/orderData';

export default function ProductCard({ productObj }) {
  const { user } = useAuth();
  const [cart, setCart] = useState({});

  const getCartDetails = async () => {
    if (user) { // Check if user and user[0].id are available
      try {
        const cartData = await getCart(user[0].id);
        setCart(cartData);
      } catch (error) {
        console.error('Error fetching cart details:', error);
      }
    }
  };

  const addThisProductToCart = () => {
    if (cart[0]?.id) {
      const payload = {
        productId: productObj.id,
        orderId: cart[0].id,
      };
      window.alert('Product added to cart!');
      addToCart(payload);
    } else {
      window.alert('Unable to add product to cart. Please try again later.');
    }
  };

  useEffect(() => {
    getCartDetails();
  }, [user]);

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={productObj.image} alt={productObj.name} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title className="card-title">{productObj.name}</Card.Title>
        <Card.Text className="card-text">{productObj.description}</Card.Text>
        <Card.Text className="card-text">Price: ${productObj.price}</Card.Text>
        <Card.Text className="card-text">Category: {productObj.category.name}</Card.Text>
        <Card.Text className="card-text"><a href={`/seller/${productObj.seller.id}`}>Seller: {productObj.seller.username}</a></Card.Text>
        <Button><Link href={`/products/${productObj.id}`}>View Details</Link></Button>
        <Button onClick={addThisProductToCart}>Add to Cart</Button>
      </Card.Body>
    </Card>
  );
}

ProductCard.propTypes = {
  productObj: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    id: PropTypes.number,
    category: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
    seller: PropTypes.shape({
      username: PropTypes.string,
      id: PropTypes.number,
    }),
  }).isRequired,
};
