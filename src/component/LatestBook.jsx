import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import { useEffect } from 'react'
import ProductItem from './ProductItem'

const LatestBook = () => {

  const { products } = useContext(ShopContext)
  const [latestProducts, setLatestProducts] = useState([])

  useEffect(() => {
    setLatestProducts(products.slice(0, 4))
  }, [])


  return (
    <div className=" my-10">
      <div className=" text-center py-8 text-3xl">
        <Title text1={"LATEST"} text2={"BOOK"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Step back into the magical world of Hogwarts with the latest addition to the Harry Potter series.
        </p>
      </div>
      {/* Rendering Product */}
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
        {latestProducts.map((item, index) => (
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

export default LatestBook