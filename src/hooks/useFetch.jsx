import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useFetch(url) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [data, setData] = useState([])

    useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true)
          const response = await axios.get(url)
          setData(response.data)
        } catch (error) {
          console.log(error)
          setError(error)
        } finally {
          setLoading(false)
        }
      }
      fetchData()
    }, [url])
  
    return {data, error, loading}
   
}
