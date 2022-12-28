import React from 'react'
import Container from 'react-bootstrap/Container'
import { Outlet, useLocation } from 'react-router-dom'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import Spinner from '../utils/Spinner'
import useFetch from '../hooks/useFetch'
import ProductContainer from '../components/ProductContainer'

export default function Products() {
  const { data, error, loading } = useFetch(
    'https://ecommtest.onrender.com/products'
  )
  console.log(data)
  const location = useLocation()

  return (
    <Container style={{ marginTop: '5rem' }}>
      {location.pathname === '/products' ? (
        <>
          {loading && <Spinner />}
          {(error || data) && (
            <>
              {error && <p className='text-center'>{error.message}</p>}
              {data && (
                <ResponsiveMasonry
                  columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, 1200: 4 }}
                  className='mt-5'
                >
                  <Masonry gutter='30px'>
                    {data.map((product) => (
                      <ProductContainer key={product.id} {...product} />
                    ))}
                  </Masonry>
                </ResponsiveMasonry>
              )}
            </>
          )}
        </>
      ) : (
        <Outlet />
      )}
    </Container>
  )
}
