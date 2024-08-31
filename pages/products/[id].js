import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { getSingleProduct, addToCart } from '../../data/productData';
import { useAuth } from '../../utils/context/authContext';

export default function ViewProductDetails() {
  const [productDetails, setProductDetails] = useState();
  const router = useRouter();
  const { user } = useAuth();

  const { id } = router.query;

  useEffect(() => {
    getSingleProduct(id).then(setProductDetails);
  }, [id]);

  const addThisProductToCart = () => {
    window.alert('Product added to cart!');
    const payload = {
      productId: productDetails.id,
      userId: user.id,
    };
    console.warn(payload);
    addToCart(payload);
  };

  return (
    <div className="mt-5 d-flex flex-wrap">
      {console.warn(productDetails)}
      <div className="d-flex flex-column">
        <img src={productDetails?.image} alt={productDetails?.name} style={{ width: '300px' }} />
      </div>
      <div className="text-white ms-5 details">
        <h5>
          {productDetails?.name}
        </h5>
        Seller: <a href={`products/${productDetails?.seller?.username}`}>{productDetails?.seller?.username}</a>
        <p>{productDetails?.description || ''}</p>
        <hr />
        <p>
          {productDetails?.price}
        </p>
        <Button onClick={addThisProductToCart}>Add to Cart</Button>
      </div>
    </div>
  );
}
