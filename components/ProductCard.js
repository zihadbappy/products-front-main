import React, { useState } from 'react';
import { Button, Modal, Form, Input, Select, message } from 'antd';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export const ProductCard = ({ product, removeProductFromList, updateProductInList, productList }) => {
  const { name, image, description, price, category, brand, stockQuantity } = product;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    name,
    image,
    description,
    price,
    category,
    brand,
    stockQuantity,
  });

  const showModal = () => {
    setIsModalVisible(true);
  };

  const showDetailsModal = () => {
    setIsDetailsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDetailsModalCancel = () => {
    setIsDetailsModalVisible(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      // const baseURL = process.env.BASE_URL;
      const response = await axios.delete(`${process.env.BASE_URL}/delete/${product._id}`);
      console.log(response);
      if (response.status === 200) {
        message.success('Product deleted successfully');
        removeProductFromList(product._id);
      }
    } catch (error) {
      message.error('Error deleting product');
      console.error('Error Deleting product:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const baseURL = process.env.BASE_URL;
      const response = await axios.patch(`${process.env.BASE_URL}/edit/${product._id}`, formData);
      console.log(response);
      if (response.status === 200) {
        message.success('Product updated successfully');
      }
      setFormData(response.data); 
    } catch (error) {
      message.error('Error updating product');
      console.error('Error updating product:', error);
    }
    setIsModalVisible(false);
  };
  

  return (
    <div className='product-card-container'>
      <div className='product-card'>
        <img src={image} alt={name} />
        <div className='card-container'>
          <div className='card-top-sec'>
            <Button type='primary' style={{ backgroundColor: 'black' }}>
              {category}
            </Button>

            <Button type='primary' onClick={showDetailsModal}>
              Details
            </Button>
          </div>

          <div className='card-content'>
            <h2>{name}</h2>
            <p>${price}</p>
          </div>

          <Button type='primary' onClick={showModal} style={{ backgroundColor: 'green', borderColor: 'green' }}>
            Edit
          </Button>

          <Button
            type='primary'
            style={{
              marginTop: '10px',
              backgroundColor: 'red',
              borderColor: 'red',
              marginLeft: '10px',
            }}
            onClick={handleDelete}
          >
            Delete
          </Button>

          <Modal
            title='Edit Product'
            visible={isModalVisible}
            onCancel={handleCancel}
            footer={[
              <Button key='cancel' onClick={handleCancel}>
                Cancel
              </Button>,
              <Button key='submit' type='primary' onClick={handleSubmit}>
                Save
              </Button>,
            ]}
          >
            <Form layout='vertical'>
              <Form.Item label='Name'>
                <Input name='name' value={formData.name} onChange={handleFormChange} />
              </Form.Item>
              <Form.Item label='Image'>
                <Input name='image' value={formData.image} onChange={handleFormChange} />
              </Form.Item>
              <Form.Item label='Description'>
                <Input.TextArea name='description' value={formData.description} onChange={handleFormChange} />
              </Form.Item>
              <Form.Item label='Price'>
                <Input name='price' value={formData.price} onChange={handleFormChange} />
              </Form.Item>
              <Form.Item label='Category'>
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
              </Form.Item>

              <Form.Item label='Brand'>
                <Input name='brand' value={formData.brand} onChange={handleFormChange} />
              </Form.Item>
              <Form.Item label='Stock Quantity'>
                <Input
                  name='stockQuantity'
                  value={formData.stockQuantity}
                  onChange={handleFormChange}
                />
              </Form.Item>
            </Form>
          </Modal>

          <Modal
            title='Product Details'
            visible={isDetailsModalVisible}
            onCancel={handleDetailsModalCancel}
            footer={[
              <Button key='close' onClick={handleDetailsModalCancel}>
                Close
              </Button>,
            ]}
          >
            <div>
              <h2 style={{ textAlign: 'center' }}>{name}</h2>
              <img src={image} style={{ width: '100%' }} alt='Product Image' />
            </div>
            <div>
              <p>{description}</p>
              <p>In Stock: {stockQuantity} units</p>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};
