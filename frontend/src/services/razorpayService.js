import { createRazorpayOrder, verifyPayment as verifyPaymentAPI } from './api';

// Initialize Razorpay
const loadRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve();
    document.body.appendChild(script);
  });
};

// Create order
export const createOrder = async (amount, currency = 'INR') => {
  try {
    const response = await createRazorpayOrder(amount);
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

// Initialize payment
export const initializePayment = async (orderId, amount, name, email, phone) => {
  await loadRazorpay();

  const options = {
    key: process.env.REACT_APP_RAZORPAY_KEY_ID,
    amount: amount,
    currency: 'INR',
    name: 'GGI Hi-Tech Farm',
    description: 'Payment for your order',
    order_id: orderId,
    handler: async (response) => {
      try {
        await verifyPaymentAPI({
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        });
        return response;
      } catch (error) {
        console.error('Error verifying payment:', error);
        throw error;
      }
    },
    prefill: {
      name,
      email,
      contact: phone,
    },
    theme: {
      color: '#3399cc',
    },
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
};

// Verify payment
export const verifyPayment = async (orderId, paymentId, signature) => {
  try {
    const response = await verifyPaymentAPI({
      razorpay_order_id: orderId,
      razorpay_payment_id: paymentId,
      razorpay_signature: signature,
    });
    return response.data;
  } catch (error) {
    console.error('Error verifying payment:', error);
    throw error;
  }
}; 