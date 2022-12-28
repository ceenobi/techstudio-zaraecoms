import React, { useRef } from 'react'
import { Image, Container, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
import { formatCurrency } from '../utils/formatCurrency'
import Spinner from '../utils/Spinner'
import { useStateContext } from '../lib/ContextApi'

export default function FeatureProducts({ data, error, loading }) {
  const scrollRef = useRef()

  const scroll = (direction) => {
    const { current } = scrollRef
    direction === 'left'
      ? (current.scrollLeft -= 300)
      : (current.scrollLeft += 300)
  }
  const featureProducts = data.filter(
    (product) => product.price >= 700 && product.price <= 5000
  )
  const { increaseBagQuantity } = useStateContext()

  return (
    <Container className='mt-5 p-3'>
      <h6 className='mt-5'>Featured Products</h6>
      {loading && <Spinner />}
      {(error || featureProducts) && (
        <>
          {error && <p className='text-center'>{error.message}</p>}
          <div className='position-relative'>
            <Container
              ref={scrollRef}
              className='d-flex overflow-scroll scrollbody'
              style={{ scrollBehavior: 'smooth' }}
            >
              {featureProducts.slice(0, 9).map((product) => (
                <div key={product.id} className='me-3'>
                  <Link to={`/products/${product.id}`}>
                    <div style={{ width: '270px', height: '350px' }}>
                      <Image
                        src={product.images[0]}
                        alt={product.title}
                        className='w-100 h-100'
                      />
                    </div>
                  </Link>
                  <p className='text-dark mb-0'>{product.title}</p>
                  <p>{formatCurrency(product.price)}</p>
                  <Button
                    variant='outline-dark'
                    className='border-none rounded-0'
                    onClick={() => increaseBagQuantity(product.id)}
                  >
                    ADD TO BAG
                  </Button>
                </div>
              ))}
            </Container>
            <div className='d-none d-md-block w-100 position-absolute top-50'>
              <div className='d-flex justify-content-between align-items-center'>
                <AiOutlineArrowLeft
                  size='2rem'
                  style={{ cursor: 'pointer' }}
                  onClick={() => scroll('left')}
                />
                <AiOutlineArrowRight
                  size='2rem'
                  style={{ cursor: 'pointer' }}
                  onClick={() => scroll('right')}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </Container>
  )
}
