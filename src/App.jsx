import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Navbar from './component/Navbar'
import Footer from './component/Footer'
import Book from './pages/Book'
import ScrollToTop from './component/ScrollToTop'
import SearchBar from './component/SearchBar'

const App = () => {
  return (
    <div className=' px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <Navbar />
      <SearchBar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book" element={<Book />} />
        <Route path="/product/:productID" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App