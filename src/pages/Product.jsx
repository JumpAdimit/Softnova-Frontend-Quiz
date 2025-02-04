import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import RelatedProduct from '../component/RelatedProduct'

const Product = () => {

  const { productID } = useParams()
  const { products, currency, addToCart } = useContext(ShopContext)
  const [productData, setProductData] = useState(false)
  const [image, setImage] = useState('')
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrease = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  const handleChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    } else {
      setQuantity(1);
    }
  };

  const fetchProductData = async () => {

    products.map((item) => {
      if (item._id === productID) {
        setProductData(item)

        setImage(item.image[0])
      }
    })

  }

  useEffect(() => {
    fetchProductData()
    setQuantity(1);
  }, [productID, products])

  return productData ? (
    <div className=' border-t-2 border-gray-300 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* Product Data */}
      <div className=' flex gap-12 sm:gap-12 flex-col sm:flex-row'>

        {/* Product Image */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className=' flex sm:flex-col overflow-x-auto sm:overflow-y-hidden justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {
              productData.image.map((item, index) => (
                <img onClick={() => setImage(item)} src={item} key={index} className=' w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' alt="" />
              ))
            }
          </div>
          <div className=' w-full sm:w-[78.5%] '>
            <img className=' w-full h-auto ' src={image} alt="" />
          </div>
        </div>

        {/* Product Info */}
        <div className=' flex-1'>
          <h1 className=' font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className=' flex items-center gap-1 mt-2'>
            <img className=' w-3.5' src={assets.star_icon} alt="" />
            <img className=' w-3.5' src={assets.star_icon} alt="" />
            <img className=' w-3.5' src={assets.star_icon} alt="" />
            <img className=' w-3.5' src={assets.star_icon} alt="" />
            <img className=' w-3.5' src={assets.star_dull_icon} alt="" />
            <p className=' pl-2'>(427)</p>
          </div>
          <p className=' mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
          <div className=' flex flex-col gap-4 my-8'>
            <p>Quantity</p>
            <div className=' flex gap-2'>
              <div className="flex items-center gap-0.5">
                <button onClick={handleDecrease} className=' text-white bg-black w-7 text-xl font-medium' >
                  <p>-</p>
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={handleChange}
                  className="w-10 h-7 border border-gray-400 text-center [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  min={1}
                />
                <button onClick={handleIncrease} className=' text-white bg-black w-7 text-xl font-medium'>
                  <p>+</p>
                </button>
              </div>
            </div>
          </div>
          <button onClick={() => addToCart(productData._id, quantity)} className=' bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>
          <hr className=' mt-8 sm:w-4/5 text-gray-300' />
          <div className=' text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Authentic and High-Quality Publications.</p>
            <p>Cash on Delivery Available for Your Convenience.</p>
            <p>Easy Return and Exchange Policy Within 7 Days.</p>
          </div>
        </div>
      </div>

      {/* Description & Review Section */}
      <div className=' mt-20'>
        <div className=' flex'>
          <b className=' border border-gray-300 px-5 py-3 text-sm'>Description</b>
          <p className=' border border-gray-300 px-5 py-3 text-sm'>Review (78)</p>
        </div>
        <div className=' flex flex-col gap-4 border border-gray-300 px-6 py-6 text-sm text-gray-500'>
          <p>A bookstore website is an online platform that allows users to browse, purchase, and explore a wide range of books across various genres. It serves as a virtual library where readers can discover new releases, bestsellers, and classic literature, all from the comfort of their homes. Bookstore websites provide a convenient way for customers to find and buy books without needing to visit a physical store.</p>
          <p>These websites typically showcase books with detailed descriptions, cover images, pricing, and customer reviews. Users can search for books by title, author, or genre, making it easy to find specific titles. Many bookstore platforms also offer personalized recommendations, discounts, and digital formats such as e-books and audiobooks.</p>
          <p>A well-designed bookstore website enhances the shopping experience by providing features like secure payment options, fast delivery services, and loyalty programs. Whether for casual readers, students, or book collectors, an online bookstore makes discovering and purchasing books more accessible and enjoyable.</p>
        </div>
      </div>

      {/* Display related products */}
      <RelatedProduct category={productData.category} subCategory={productData.subCategory} id={productData._id} />

    </div>
  ) : <div className=' opacity-0'></div>
}

export default Product