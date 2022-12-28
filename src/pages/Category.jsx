import React from 'react'
import { Container } from 'react-bootstrap'
import { Outlet, Link, useLocation } from 'react-router-dom'
import useFetch from '../hooks/useFetch'

export default function Category() {
  const { data } = useFetch('https://ecommtest.onrender.com/categories')
  const location = useLocation()
  return (
    <Container style={{ marginTop: '7rem' }}>
      <div className='d-none d-md-flex align-items-center justify-content-center'>
        {data.map((category) => (
          <Link
            to={`/categories/${category.id}`}
            className='mx-2'
            key={category.id}
          >
            <p
              className={
                location.pathname === `/categories/${category.id}`
                  ? 'fw-bold text-black'
                  : 'text-sm text-secondary'
              }
            >
              {category.name}
            </p>
          </Link>
        ))}
      </div>
      <Outlet />
    </Container>
  )
}
