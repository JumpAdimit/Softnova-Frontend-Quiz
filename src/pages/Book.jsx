import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../component/Title';
import ProductItem from '../component/ProductItem';

const Book = () => {
  const { products, search, showSearch } = useContext(ShopContext);

  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([])
  const [subCategory, setSubCategory] = useState([])
  const [sortType, setSortType] = useState('relavent')

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value))
    } else {
      setCategory(prev => [...prev, e.target.value])
    }
  }

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value))
    } else {
      setSubCategory(prev => [...prev, e.target.value])
    }
  }

  const applyFilter = () => {
    let productsCopy = products.slice()

    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }
    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category))
    }
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory))
    }
    if (sortType === 'low-high') {
      productsCopy.sort((a, b) => a.price - b.price);
    } else if (sortType === 'high-low') {
      productsCopy.sort((a, b) => b.price - a.price);
    }
    setFilterProducts(productsCopy)
  }

  useEffect(() => {
    applyFilter()
  }, [category, subCategory, search, sortType])

  return (
    <div className=" flex flex-col sm:flex-row gap1 sm:gap-10 pt-10 border-t border-gray-300">
      {/* Filter Options */}
      <div className=" min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className=" my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS
          <img
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
            src={assets.dropdown_icon}
            alt=""
          />
        </p>
        {/* Category Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? "" : "hidden"
            } sm:block`}
        >
          <p className=" mb-3 text-sm font-medium">GENRE</p>
          <div className=" flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className=" flex gap-2">
              <input className=" w-3" type="checkbox" value={"Novel"} onChange={toggleCategory} /> Novel
            </p>
            <p className=" flex gap-2">
              <input className=" w-3" type="checkbox" value={"Self-Improvement"} onChange={toggleCategory} /> Self Improvement
            </p>
            <p className=" flex gap-2">
              <input className=" w-3" type="checkbox" value={"Biography"} onChange={toggleCategory} /> Biography
            </p>
          </div>
        </div>
        {/* Sub Category Filter*/}
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? "" : "hidden"
            } sm:block`}
        >
          <p className=" mb-3 text-sm font-medium">SUBGENRE</p>
          <div className=" flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className=" flex gap-2">
              <input className=" w-3" type="checkbox" value={"Fantasy"} onChange={toggleSubCategory} />{" "}
              Fantasy
            </p>
            <p className=" flex gap-2">
              <input className=" w-3" type="checkbox" value={"Money"} onChange={toggleSubCategory} />{" "}
              Money
            </p>
            <p className=" flex gap-2">
              <input className=" w-3" type="checkbox" value={"Historical"} onChange={toggleSubCategory} />{" "}
              Historical
            </p>
          </div>
        </div>
      </div>
      {/* Right Side */}
      <div className=" flex-1">
        <div className=" flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"ALL"} text2={"BOOKS"} />
          {/* Product Sort */}
          <select onChange={(e) => setSortType(e.target.value)} className=" border-2 border-gray-300 text-sm px-2">
            <option value="relavent">Sort by: Relavent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Map Products */}
        <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Book