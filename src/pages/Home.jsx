import React from 'react'
import useFetch from '../hooks/useFetch'
import HeroProduct from '../components/HeroProduct'
import HeroCategory from '../components/HeroCategory'
import FeatureProducts from '../components/FeatureProducts'

export default function Home() {
  const { data, error, loading } = useFetch(
    'https://ecommtest.onrender.com/products'
  )

  return (
    <>
      <HeroProduct data={data} error={error} loading={loading} />
      <HeroCategory />
      <FeatureProducts data={data} error={error} loading={loading} />
    </>
  )
}
