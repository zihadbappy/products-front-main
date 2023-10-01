import React, { useState } from 'react'
import {Input, Select, Button, message} from 'antd';
const { TextArea } = Input;
import axios from 'axios';
import { useRouter } from 'next/router';

export const MyForm = () => {

  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '', image: '', price: '', category: '', brand: '', stockQuantity: '', description: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const baseURL = 'http://localhost:5000/api/products';
      const response = await axios.post(`${baseURL}/create`, formData);
      console.log(response)
      if (response.status === 200) {
        message.success('Product added successfully');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      message.error('Error adding product');
    }
  };

  return (
    <div className='input-fields'>
        <h1 style={{textAlign: 'center'}}>Enter Product details</h1>
        <div>
          <label htmlFor="name">Product Name</label>
          <Input placeholder='Enter name of product' name="name" value={formData.name} onChange={handleInputChange} />
        </div>

        <div>
          <label htmlFor="image">Image URL</label>
          <Input placeholder='Enter image URL' name="image" value={formData.image} onChange={handleInputChange} />
        </div>
       
        <div>
            <label htmlFor="price">Price</label>
            <Input placeholder='Enter price' name="price" value={formData.price} onChange={handleInputChange} />
        </div>

        <div>
            <label htmlFor="category">Category</label>
            <Select
              placeholder='Select category' 
              name='category'
              value={formData.category}
              onChange={(value) => setFormData({ ...formData, category: value })}
              style={{ width: '100%' }}
              options={[
              {
                value: 'Electronics',
                label: 'Electronics',
              },
              {
                value: 'Vehicles',
                label: 'Vehicles',
              },
              {
                value: 'Sportswear',
                label: 'Sportswear',
              },
            ]}
            />

        </div>

        <div>
            <label htmlFor="brand">Brand</label>
            <Input placeholder='Enter brand' name="brand" value={formData.brand} onChange={handleInputChange} />
        </div>

        <div>
            <label htmlFor="stockQuantity">Quantity</label>
            <Input placeholder='Enter quantity' name="stockQuantity" value={formData.stockQuantity} onChange={handleInputChange} />
        </div>

        <div>
            <label htmlFor="description">Description</label>
            <TextArea rows={4} placeholder="Enter some description" name="description" 
                value={formData.description} onChange={handleInputChange} />
        </div>
        
        <Button type="primary" onClick={handleSubmit}>
          Submit
        </Button>

        <br />

        <Button 
          type="primary" 
          style={{marginTop:"10px", backgroundColor: 'green', borderColor: 'green'}} 
          onClick={() => router.push('/products')}
        >
          View products
        </Button>
      
    </div>
  
  )
}
