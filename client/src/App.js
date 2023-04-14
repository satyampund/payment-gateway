import React from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const initPayment = async (amount) => {
    const { data } = await axios.post('/order', {
      amount: amount,
      notes: {
        user: 'Satyam Pund',
        item: 'Veg Rush Pizza',
      },
    });

    console.log(data);
    const orderId = data.order.id;

    const options = {
      key: 'rzp_test_9jwx13Cx0m1gfM',
      amount: amount * 100,
      currency: 'INR',
      name: 'Road To Code',
      description: 'Learn Programming In Easy Way',
      image: 'https://www.roadtocode.org/static/media/logo.8dd0bf20731ffeceb4ee.png',
      order_id: orderId,
      handler: function (response) {
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
      },
      prefill: {
        name: 'Gaurav Kumar',
        email: 'gaurav.kumar@example.com',
        contact: '9000090000',
      },
      notes: {
        name: 'Gaurav Kumar',
        course: 'Python programming',
        batch: 'April 2023',
      },
      theme: {
        color: '#ffff',
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();

    rzp.on('payment.failed', function (response) {
      alert('Payment Failed');
      console.log(response);
    });
  };

  return (
    <div>
      <div className="card">
        <img
          src="https://b.zmtcdn.com/data/dish_photos/e82/c473d756114ff9dfc85f13e9e66a2e82.jpg"
          className="card-img-top"
          alt="..."
        />
        <div className="card-body text-center">
          <h5 className="card-title">Veg Rush Pizza</h5>
          <p className="card-text">₹ 300</p>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              initPayment(400);
            }}>
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
