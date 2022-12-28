import React, { useEffect, useState } from 'react'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import { AiOutlineClose } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import { Container } from 'react-bootstrap'
import ProductContainer from '../components/ProductContainer'
import Spinner from '../utils/Spinner'

export default function Search() {
  const [query, setQuery] = useState('')
  const { error, loading, data } = useFetch(
    'https://ecommtest.onrender.com/products'
  )
  const navigate = useNavigate()

  useEffect(() => {
    const getSearch = setTimeout(() => {
      if (query && query.length > 0) {
        setQuery(query)
      }
    }, 2000)
    return () => clearTimeout(getSearch)
  }, [query])

  useEffect(() => {
    const params = new URLSearchParams()
    if (query) {
      params.append('name', query)
    } else {
      params.delete('name')
    }
    navigate({ search: params.toString() })
  }, [query, navigate])

  // eslint-disable-next-line array-callback-return
  const filteredData = data.filter((res) => {
    const filter = res.title === query || res.category?.name === query
    if (query !== '') {
      return (
        res.title.toLowerCase().includes(query) ||
        res.category?.name.toLowerCase().includes(query) ||
        filter
      )
    }
  })

  return (
    <Container style={{ marginTop: '7rem' }}>
      <div className='position-relative h4 pb-2 mb-4 border-bottom border-dark'>
        <input
          className='small w-100 no-outline border-0'
          id='search'
          type='text'
          placeholder='ENTER SEARCH TERMS'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query.length > 0 && (
          <AiOutlineClose
            className='position-absolute end-0'
            onClick={() => setQuery('')}
            style={{ cursor: 'pointer' }}
          />
        )}
      </div>
      {loading && <Spinner />}
      {(error || filteredData) && (
        <div className='mt-5'>
          {error && <p className='text-center'>{error.message}</p>}
          <div className='d-flex align-items-center justify-content-between'>
            <p className='text-sm text-gray-700'>
              {filteredData.length} results
            </p>
          </div>
          {filteredData && (
            <ResponsiveMasonry
              columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, 1200: 4 }}
              className='mt-5'
            >
              <Masonry gutter='30px'>
                {filteredData.map((product) => (
                  <ProductContainer key={product.id} {...product} />
                ))}
              </Masonry>
            </ResponsiveMasonry>
          )}
        </div>
      )}
    </Container>
  )
}
