import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Navhead from './components/Navhead'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Footer from './components/Footer'
import Products from './pages/Products'
import ProductId from './pages/ProductId'
import Category from './pages/Category'
import CategoryId from './pages/CategoryId'
import Search from './pages/Search'
import {StateContext} from './lib/ContextApi'
import Cart from './pages/Cart'

function App() {
  return (
    <>
      <StateContext>
        <Navhead />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='search' element={<Search />} />
          <Route path='cart' element={<Cart />} />
          <Route path='products' element={<Products />}>
            <Route path=':productid' element={<ProductId />} />
          </Route>
          <Route path='categories' element={<Category />}>
            <Route path=':categoryid' element={<CategoryId />} />
          </Route>
        </Routes>
        <Footer />
      </StateContext>
    </>
  )
}

export default App
