import React from 'react'
import {useState,useEffect} from 'react'
import './Popular.css'
import Item from '../Item/Item'
import axios from 'axios';


const Popular = () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace 'your-backend-api-endpoint' with the actual endpoint of your backend API
        const response = await axios.get('http://localhost:3001/api/products');
        setProducts(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching data from the backend:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className='popular'>
      <h1>PRODUCTS</h1>
      <hr />
      <div className="popular-item">
        {
            products.map((item,i)=>{
              return(<Item key={i} description = {item.description} name = {item.name} price = {item.price}/>)
                // return <Item key={i} id = {item.product_id} name = {item.name} image = {item.image} new_price = {item.new_price} old_price = {item.old_price}/>
            })
        }
      </div>
    </div>
  )
}

export default Popular
