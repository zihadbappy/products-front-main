import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ProductCard } from '../../components/ProductCard';
import { Button } from 'antd';
import { useRouter } from 'next/router';


const Products = () => {
    const router = useRouter();
  const [productList, setProductList] = useState([]);   

  useEffect(() => {
    async function fetchData() {
      try {
        const baseURL = 'http://localhost:5000/api/products';
        const response = await axios.get(baseURL);
        console.log(response.data)
        setProductList(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <>
    <h1 style={{textAlign: 'center'}}>All Products</h1>
    <div className='products-list-container'>
        
        <div className='products'>
            <div className='product-center'>
            {productList.message === "There are no products" ? (
              <div className='product-row'>
                <p>{productList.message}</p>
              </div>
            ) : (
                <div className='product-grid'>
                    {
                        productList.map((product) => <div className='product-row'>
                            <ProductCard product={product} />
                        </div>)
                    }
                </div>
              )}
            </div>
        </div>
        <div style={{ display: 'flex', alignItems:'center', justifyContent: 'center', margin: '30px 0' }}>
            <Button
                type="primary"
                style={{ marginTop: "10px", backgroundColor: 'red', borderColor: 'red' }}
                onClick={() => router.push('/')}
            >
                Go Home
            </Button>
        </div>
        
    </div>
    </>
  );
};

export default Products;


