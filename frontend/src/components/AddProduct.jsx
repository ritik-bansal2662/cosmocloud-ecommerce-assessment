import React, { useState } from 'react'
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';

const AddProduct = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [qty, setQty] = useState(0)

    const submitHandler = async (e) => {
        e.preventDefault()
        console.log('data: ', name, price, qty);
        try{
            const { data } = await axios.post(
                'http://localhost:8000/products', {
                name,
                price,
                qty
            })
            console.log('data: ', data);
            alert('Product added Successfully')
            setName('')
            setPrice(0)
            setQty(0)
        } catch(err) {
            alert('unable to create Product due to some error')
            console.log(err);
        }
        
    }

  return (
    <div class='container'>
        <h1>Add a Product</h1>
        <div class='col-md-6 col-12'>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control 
                        type='name' 
                        placeholder='Enter Product Name' 
                        value={name} 
                        onChange={(e)=>setName(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='price'>
                    <Form.Label>Prduct Price ₹ </Form.Label>
                    <Form.Control 
                        type='price' 
                        placeholder='Enter Product Price' 
                        value={price} 
                        onChange={(e)=>setPrice(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='qty'>
                    <Form.Label>Available Quantity</Form.Label>
                    <Form.Control 
                        type='qty' 
                        placeholder='Enter Available Quantity' 
                        value={qty} 
                        onChange={(e)=>setQty(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Create
                </Button>
            </Form>
        </div>
    </div>
  )
}

export default AddProduct