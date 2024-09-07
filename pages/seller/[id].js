import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSellerProducts } from '../../data/productData';
import { userDetails } from '../../utils/auth';
import ProductCard from '../../components/ProductCard';

function SellerStore() {
  const [sellerProducts, setSellerProducts] = useState([]);
  const [sellerDetails, setSellerDetails] = useState([]);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    userDetails(id).then(setSellerDetails);
    getSellerProducts(id).then(setSellerProducts);
  }, [id]);

  return (
    <>
      <div>
        <h1>{sellerDetails.username}: Store Front </h1>
      </div>
      <div
        className="card-container d-flex flex-wrap"
        style={{ margin: '0 auto' }}
      >
        {sellerProducts.map((product) => (
          <ProductCard key={product.id} productObj={product} onUpdate={getSellerProducts} />
        ))}
      </div>
    </>
  );
}

export default SellerStore;
