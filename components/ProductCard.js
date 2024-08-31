import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';
import { addToCart } from '../data/productData';

export default function ProductCard({ productObj }) {
  const { user } = useAuth();

  const addThisProductToCart = () => {
    window.alert('Product added to cart!');
    const payload = {
      productId: productObj.id,
      userId: user.id,
    };
    console.warn(payload);
    addToCart(payload);
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={productObj.image} alt={productObj.name} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title className="card-title">{productObj.name}</Card.Title>
        <Card.Text className="card-text">{productObj.description}</Card.Text>
        <Card.Text className="card-text">{productObj.price}</Card.Text>
        <Card.Text className="card-text">Category: {productObj.category.name}</Card.Text>
        <Card.Text className="card-text">Seller: {productObj.seller.username}</Card.Text>
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
    }),
  }).isRequired,
};
