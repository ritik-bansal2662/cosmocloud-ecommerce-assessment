import React, { useEffect, useState } from 'react'
import axios from 'axios';

const MyOrders = () => {
    const [orders, setOrders] = useState([])

    useEffect(() => {
        fetchOrders();
      }, []);
    
      const fetchOrders = async () => {
        try {
          const response = await axios.get('http://localhost:8000/orders');
          let allorders= response.data.allorders.map((order) => JSON.parse(order))
          setOrders(allorders)
        } catch (error) {
          console.error(error);
        }
      };

  return (
    <div class='container'>
        <h1>My Orders</h1>
        <ul class='d-flex flex-wrap list-unstyled'>
        { orders.length > 0 ? orders.map((order) => (
          <li key={order.id} class='col-lg-3 col-md-3 col-6 border border-secondary m-2 p-2'>
            <p>Order Id: {order.id}</p>
            <ul>
                <p><b>Items: </b>{order.items.map((item) => (
                        <li>
                            <p>Name: {item.name}</p>
                            <p>Quantity: {item.qty}</p>
                        </li>
                    ))}
                </p>
            </ul>
            <p><b>Amount: </b>₹{order.amount}</p>
          </li>
        )) : 
            <p>No Orders Placed</p>
        }
      </ul>
    </div>
  )
}

export default MyOrders