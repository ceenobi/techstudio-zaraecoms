import React from 'react'
import { Carousel, Button, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Spinner from '../utils/Spinner'

export default function HeroProduct({ data, error, loading }) {
  console.log('herodata', data)
  const bannerProduct = data.filter((product) => product.price >= 500)
  console.log('banner', bannerProduct)
  return (
    <div>
      {loading && <Spinner />}
      {(error || data) && (
        <>
          {error && <p>{error.message}</p>}
          <Carousel variant='dark'>
            {bannerProduct.slice(0, 3).map((banner) => (
              <Carousel.Item key={banner.id}>
                <Image
                  fluid
                  className='d-block w-100'
                  src={banner.images[2]}
                  alt={banner.title}
                  style={{ height: '600px', objectFit:'inherit'}}
                />
                <Carousel.Caption>
                  <h1 className='display-3'>{banner.title}</h1>
                  <Link to={`/products/${banner.id}`}>
                    <Button
                      variant='dark'
                      size='lg'
                      className='border-none rounded-0'
                    >
                      BUY NOW
                    </Button>
                  </Link>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </>
      )}
    </div>
  )
}
