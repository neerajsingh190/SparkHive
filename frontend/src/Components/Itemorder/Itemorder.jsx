import React from 'react'
import './Itemorder.css'
import {toast} from 'react-toastify'
import { useEffect,useState,useContext } from 'react'
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios'
import { ShopContext } from "../../Context/ShopContext";
import { useParams } from 'react-router-dom';

const Itemorder = () => {


    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        addressLine1: '', 
        addressLine2: '', 
        city: '',
        state: '',
        postalCode: '', 
        phoneNumber: '',
        isDefault: false, 
    });

    const {itemid} = useParams();
    
const { products, cartItems } = useContext(ShopContext);

const navigate = useNavigate();

const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setFormData(formData => ({ ...formData, [name]: value }))
}


function totalForProduct() { 
    const itemInfo = products.find(product => product.product_id === Number(itemid)); 

    return itemInfo ? itemInfo.price : 0;
  }
  


const placeOrder = async (e) => {
    // e.preventDefault()
    // let orderItems = [];
    // products.map(((item) => {
    //     if (cartItems[item._id] > 0) {
    //         let itemInfo = item;
    //         itemInfo["quantity"] = cartItems[item._id];
    //         orderItems.push(itemInfo)
    //     }
    // }))
    // let orderData = {
    //     address: formData,
    //     items: orderItems,
    //     amount: totalForProduct(itemid,products) + 5,
    // let response = await axios.post(url + "/api/order/place", orderData, { headers:  token });
    // if (response.data.success) {
        //     const { session_url } = response.data;
        //     window.location.replace(session_url);
        // }
        // else {
            //     toast.error("Something Went Wrong")
            // }
        }


useEffect(() => {
    if (!localStorage.getItem("auth-token")) {
        alert("to place an order sign in first")
        navigate('/login')
    }
    else if (totalForProduct() === 0) {
        navigate('/cart')
    }
}, [localStorage.getItem("auth-token")])

    return (
  
      <form onSubmit={placeOrder} className='place-order'>
          <div className="place-order-left">
              <p className='title'>Delivery Information</p>
              <div className="multi-field">
                  <input type="text" name='firstName' onChange={onChangeHandler} value={formData.firstName} placeholder='First name' required />
                  <input type="text" name='lastName' onChange={onChangeHandler} value={formData.lastName} placeholder='Last name' required />
              </div>
              <input type="email" name='email' onChange={onChangeHandler} value={formData.email} placeholder='Email address' required />
              <div className="input-group">
    <label htmlFor="addressLine1">Address Line 1</label>
    <input
      type="text"
      id="addressLine1"
      name="addressLine1"
      value={formData.addressLine1} // Assuming you have this in your state
      onChange={onChangeHandler}
      required
    />
  </div>
  <div className="input-group">
    <label htmlFor="addressLine2">Address Line 2 (Optional)</label>
    <input  type="text" id="addressLine2" name="addressLine2" value={formData.addressLine2} // Assuming you have this in your state
      onChange={onChangeHandler}
    />
  </div>
              <div className="multi-field">
                  <input type="text" name='city' onChange={onChangeHandler} value={formData.city} placeholder='City' required />
                  <input type="text" name='state' onChange={onChangeHandler} value={formData.state} placeholder='State' required />
              </div>
              <div className="multi-field">
                  <input type="text" name='postalCode' onChange={onChangeHandler} value={formData.postalCode} placeholder='Postal code' required />
                 
              </div>
              <input type="text" name='phoneNumber' onChange={onChangeHandler} value={formData.phoneNumber} placeholder='Phone' required />
          </div>
          <div className="place-order-right">
              <div className="cart-total">
                  <h2>Cart Totals</h2>
                  <div>
                      <div className="cart-total-details"><p>Subtotal</p><p>INR {totalForProduct()}</p></div>
                      <hr />
                      <div className="cart-total-details"><p>Delivery Fee</p><p>INR {totalForProduct() === 0 ? 0 : 5}</p></div>
                      <hr />
                      <div className="cart-total-details"><b>Total</b><b>INR {totalForProduct() === 0 ? 0 : totalForProduct() + 5}</b></div>
                  </div>
              </div>
              <button className='place-order-submit' type='submit'>Proceed To Payment</button>
          </div>
      </form>
  )
  
}

export default Itemorder
