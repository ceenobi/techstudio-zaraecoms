import React from 'react'
import { Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { formatCurrency } from '../utils/formatCurrency'

export default function ProductContainer({ id, images, title, price }) {
  return (
    <Link to={`/products/${id}`}>
      <>
        <div style={{ height: '420px' }}>
          <Image
            src={images[0]}
            alt={title}
            className='w-100 h-100'
            style={{ objectFit: 'inherit' }}
          />
        </div>
        <div className='d-flex justify-content-between'>
          <p className='text-uppercase text-xs text-dark'>
            {title.slice(0, 30)}
          </p>
          <p className='text-uppercase text-xs text-secondary'>
            {formatCurrency(price)}
          </p>
        </div>
      </>
    </Link>
  )
}
