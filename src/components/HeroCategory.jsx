import React from 'react'
import { Carousel, Button, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import Spinner from '../utils/Spinner'

export default function HeroCategory() {
  const { data, error, loading } = useFetch(
    'https://ecommtest.onrender.com/categories'
  )

  const bannerCategory = data.filter(
    (category) => category.name === 'Fashion' || category.name === 'Earpiece'
  )
  console.log('b', bannerCategory)

  return (
    <Container className='mt-5'>
      {loading && <Spinner />}
      {(error || data) && (
        <>
          {error && <p>{error.message}</p>}
          <Carousel variant='dark'>
            {bannerCategory.map((banner) => (
              <Carousel.Item key={banner.id}>
                <img
                  className='d-block w-100'
                  src={banner.image}
                  alt={banner.name}
                  style={{ height: '600px', objectFit: 'inherit' }}
                />
                <Carousel.Caption>
                  <h1 className='display-3'>{banner.name}</h1>
                  <Link to={`/categories/${banner.id}`}>
                    <Button
                      variant='outline-dark'
                      size='lg'
                      className='border-none rounded-0'
                    >
                      SEE MORE
                    </Button>
                  </Link>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </>
      )}
    </Container>
  )
}
