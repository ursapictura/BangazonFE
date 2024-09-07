import { useEffect, useState } from 'react';
import { checkUser } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import ProductCard from '../components/ProductCard';
import { getNew20 } from '../data/productData';
import RegisterForm from '../components/RegisterForm';

function Home() {
  const { user } = useAuth();
  const [authUser, setAuthUser] = useState();
  const [twentyNewestProducts, setTwentyNewestProducts] = useState([]);

  const getTwentyNewestProducts = () => {
    getNew20().then(setTwentyNewestProducts);
  };

  useEffect(() => {
    checkUser(user.uid).then((data) => setAuthUser(data[0]));
    getTwentyNewestProducts();
  }, [user.uid]);

  const onUpdate = () => {
    checkUser(user.uid).then((data) => setAuthUser(data));
  };

  return (
    <>
      {authUser?.uid === user?.uid ? (
        <>
          <div
            className="text-center d-flex flex-column justify-content-center align-content-center"
            style={{
              height: '20vh',
              padding: '30px',
              maxWidth: '900px',
              margin: '0 auto',
            }}
          >
            <h1>Welcome to The Darkest Web!</h1>
          </div>

          <div
            className="card-container d-flex flex-wrap"
            style={{ margin: '0 auto' }}
          >
            {twentyNewestProducts.map((product) => (
              <ProductCard key={product.id} productObj={product} onUpdate={getTwentyNewestProducts} />
            ))}
          </div>
        </>
      ) : (<RegisterForm user={user} onUpdate={onUpdate} />)}
    </>
  );
}

export default Home;
