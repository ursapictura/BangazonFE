import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import { checkoutOrder, getSingleOrder } from '../data/orderData';
import getPaymentTypes from '../data/paymentData';

const initialState = {
  paymentTypeId: '',
};

export default function CheckoutForm({ orderId }) {
  const [orderFormInput, setOrderFormInput] = useState(initialState);
  const [orderDetails, setOrderDetails] = useState({});
  const [paymentTypes, setPaymentTypes] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getSingleOrder(orderId).then(setOrderDetails);
    getPaymentTypes().then(setPaymentTypes);
  }, [orderId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...orderFormInput, orderDate: Date.now(), closed: true };
    checkoutOrder(orderId, payload);
    router.push('/confirmation');
  };

  const handleChange = (e) => { // Added a handler to update state on input change
    setOrderFormInput({
      ...orderFormInput,
      [e.target.name]: e.target.value,
    });
  };

  if (!orderDetails.closed) {
    return (
      <Form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <h3>Cart Total: {orderDetails.totalPrice}</h3>

        <Form.Group md="4" controlId="paymentSelect">
          {/* <Form.Label className="text">Select Payment Type</Form.Label> */}
          <Form.Select
            required
            name="paymentTypeId"
            value={orderFormInput.paymentTypeId}
            onChange={handleChange}
          >
            <option value="">Select Payment Type</option>
            {
            paymentTypes.map((p) => (
              <option
                key={p.id}
                value={p.id}
              >
                {p.name}
              </option>
            ))
        }
          </Form.Select>
        </Form.Group>

        <div className="submitButtonDiv">
          <Button type="submit">Complete Checkout</Button>
        </div>
      </Form>
    );
  }

  return (
    <h2>You do not have an open order. Please add items to your cart if you wish to checkout!</h2>
  );
}

CheckoutForm.propTypes = {
  orderId: PropTypes.number.isRequired,
};
