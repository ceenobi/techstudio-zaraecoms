import { useEffect, useState } from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import Spinner from '../utils/Spinner'

export default function Navlocker({ isOpen, setOpen }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await axios.get(
          'https://ecommtest.onrender.com/categories'
        )
        setCategories(response.data)
      } catch (error) {
        console.log(error)
        setError(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <div className='position-fixed top-0 h-100'>
      <div className='p-4 bg-light h-100' style={{ width: '24rem' }}>
        <div style={{ marginTop: '5rem' }}>
          <NavLink to='/products' onClick={() => setOpen(!isOpen)}>
            <p className='text-dark'>Products</p>
          </NavLink>
          <p className='text-dark'>Categories</p>
          {loading && <Spinner />}
          {(error || categories) && (
            <>
              {error && <p>{error.message}</p>}
              {categories.map((cat) => (
                <NavLink
                  key={cat.id}
                  to={`/categories/${cat.id}`}
                  onClick={() => setOpen(!isOpen)}
                >
                  <p className='text-sm mt-4 text-secondary'>{cat.name}</p>
                </NavLink>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
