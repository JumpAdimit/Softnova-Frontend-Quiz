import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const Recommend = () => {

  const { products } = useContext(ShopContext)
  const [recommednedProducts, setRecommendedProducts] = useState([])

  useEffect(() => {
    setRecommendedProducts(products.filter(item => item.recommend === true).slice(-4))
  }, [])

  return (
    <div className=" my-10">
      <div className=" text-center py-8 text-3xl">
        <Title text1={"RECOMMENDED"} text2={"BOOK"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Explore our top recommended books, featuring powerful biographies of remarkable individuals and insightful money books to help you achieve financial success.
        </p>
      </div>
      {/* Rendering Product */}
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
        {recommednedProducts.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            name={item.name}
            image={item.image}
            price={item.price}
          />
        ))}
      </div>
    </div>
  )
}

export default Recommend