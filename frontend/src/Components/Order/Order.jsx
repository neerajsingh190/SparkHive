import React from 'react'
import './Order.css'
import {toast} from 'react-toastify'
import { useEffect,useState,useContext } from 'react'
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios'
import { ShopContext } from "../../Context/ShopContext";

const Order = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    addressLine1: '', // Use address_line1 from schema
    addressLine2: '', // Use address_line2 from schema
    city: '',
    state: '',
    postalCode: '', // Use postal_code from schema
    phoneNumber: '',
    isDefault: false, // Use is_default from schema (default to false)
  });

const { getTotalCartAmount, product, cartItems } = useContext(ShopContext);

const navigate = useNavigate();

const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setFormData(formData => ({ ...formData, [name]: value }))
}

const placeOrder = async (e) => {
    e.preventDefault()
    let orderItems = [];
    product.map(((item) => {
        if (cartItems[item._id] > 0) {
            let itemInfo = item;
            itemInfo["quantity"] = cartItems[item._id];
            orderItems.push(itemInfo)
        }
    }))
    let orderData = {
        address: formData,
        items: orderItems,
        amount: getTotalCartAmount() + 5,
    }
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
        toast.error("to place an order sign in first")
        navigate('/cart')
    }
    else if (getTotalCartAmount() === 0) {
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
                      <div className="cart-total-details"><p>Subtotal</p><p>INR {getTotalCartAmount()}</p></div>
                      <hr />
                      <div className="cart-total-details"><p>Delivery Fee</p><p>INR {getTotalCartAmount() === 0 ? 0 : 5}</p></div>
                      <hr />
                      <div className="cart-total-details"><b>Total</b><b>INR {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 5}</b></div>
                  </div>
              </div>
              <button className='place-order-submit' type='submit'>Proceed To Payment</button>
          </div>
      </form>
  )
  
}

export default Order
