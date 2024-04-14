
import './App.css';
import { BrowserRouter , Route, Routes , } from "react-router-dom";

import ShopCategory from './pages/ShopCategory';
import Product from './pages/Product'
import Shop from './pages/Shop';
import Navbar from './Components/Navbar/Navbar';
import Cart from './pages/Cart'
import LoginSignup from './pages/LoginSignup'
import Account  from './pages/Account'
import Search from './pages/Search'
import Order from './Components/Order/Order';
import Itemorder from './Components/Itemorder/Itemorder';

function App() {
  return (
    <div >
        <BrowserRouter>
       <Navbar />
        <Routes>
          <Route path='/' element={<Shop/>}/>
          <Route path='/mens' element={<ShopCategory category="mens"/>}/>
          <Route path='/account' element={<Account/>}/>
          <Route path='/womens' element={<ShopCategory category="womens"/>}/>
          <Route path='/kids' element={<ShopCategory category="kids"/>}/>

          <Route path='/product' element={<Product/>}>
            <Route path=':productId' element={<Product/>}/>
          </Route>

          <Route path='/itemorder' element={<Itemorder/>}>
            <Route path=':itemid' element={<Itemorder/>}/>
          </Route>
          
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/order' element={<Order />} />
          <Route path='/search' element={<Search/>}/>
          <Route path='/login' element={<LoginSignup/>}/>
        </Routes>
        </BrowserRouter>
    </div>
  );
} 

export default App;
