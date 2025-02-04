import React from 'react'
import Hero from '../component/Hero'
import Recommend from '../component/Recommend'
import LatestBook from '../component/LatestBook'

const Home = () => {
  return (
    <div>
      <Hero />
      <LatestBook />
      <Recommend />
    </div>
  )
}

export default Home