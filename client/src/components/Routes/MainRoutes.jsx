import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Login from '../pages/Authentication/Login'
import Signup from '../pages/Authentication/Signup'
import Dashboard from '../pages/Dashboard'
import Notfound from '../404/Notfound'
const Products=React.lazy(()=>import('../pages/static/Products'))
import ProductDetails from '../pages/static/ProductDetails'
import About from '../pages/static/About'
import Contact from '../pages/static/Contact'
import OrderPage from '../pages/static/OrderPage'
import CartPage from '../pages/static/Cartpage'
import CheckoutPage from '../pages/static/CheckoutPage'
import OrderConfirmationPage from '../pages/static/OrderConfirmation'
import PaymentPage from '../pages/static/Paymentpage'
import Protected from '../utills/Protected'

const MainRoutes = () => {
  return (
    <>
        <Routes>
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/' element={<Dashboard/>} />
          <Route path='/products' element={<Products/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/contact' element={<Contact/>} />
          <Route path='/product-details' element={<ProductDetails/>} />
          <Route path='/cartpage' element={<Protected Component={CartPage}/>} />
          <Route path='/order/product' element={<Protected Component={OrderPage}/>} />
          <Route path='/checkout/product' element={<Protected Component={CheckoutPage}/>} />
          <Route path='/payment/product' element={<Protected Component={PaymentPage}/>} />
          <Route path='/order-confirmation/product' element={<Protected Component={OrderConfirmationPage}/>} />
          <Route path='*' element={<Notfound/>} />
        </Routes>
    </>
  )
}

export default MainRoutes