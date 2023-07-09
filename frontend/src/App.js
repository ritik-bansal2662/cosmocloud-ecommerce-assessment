import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddProduct from './components/AddProduct';
import MyOrders from './components/MyOrders';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/products');
      let allProducts= response.data.allProducts.map((prod) => JSON.parse(prod))
      setProducts(allProducts);
    } catch (error) {
      console.error(error);
    }
  };

  const addToCart = (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
  };

  const placeOrder = async () => {
    try {
      let orderItems = cart.map((cartItem) => ({
          "id":cartItem.id,
          "name":cartItem.name,
          "qty":1
      }))
      let amount = cart.reduce((acc, cartItem) => acc + Number(cartItem.price), 0 )

      const response = await axios.post('http://localhost:8000/orders/', { 
        'items': orderItems,
        'amount' : amount
      });
      alert(response.data.message); // Handle success response
    } catch (error) {
      console.error(error); // Handle error response
    }
  };

  return (
    <div>
      <AddProduct />
      <hr />
      <MyOrders />
      <hr />
      <div class='container'>
        <h1>Products</h1>
        <ul class='d-flex flex-wrap list-unstyled'>
          { products.length ? products.map((product) => (
            <li key={product._id} class='col-lg-3 col-md-3 col-6 border border-secondary m-2 p-2'>
              <p>Name: {product.name}</p>
              <p>Price: ₹{product.price}</p>
              <p>Available Quantity: {product.qty}</p>
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            </li>
          )) : 
            <p>No Product Available. You can add in the above 'Add a Product' Section</p>
          }
        </ul>

      <hr />

      <h1>Cart</h1>
      <ul>
        {cart.length > 0 ? cart.map((product) => (
          <li key={product._id}>
            <p>Name: {product.name}</p>
            <p>Price: ₹{product.price}</p>
            <p>Description: {product.qty}</p>
          </li>
        )) : 
          <p>No Item in Cart</p>
        }
      </ul>

      <button onClick={placeOrder}>Place Order</button>
      <hr />
    </div>
    </div>
  );
}

export default App;
