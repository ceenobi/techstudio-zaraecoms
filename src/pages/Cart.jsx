import React from 'react'
import { Container } from 'react-bootstrap'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import BagItem  from '../components/BagItem'
import useFetch from '../hooks/useFetch'
import { useStateContext } from '../lib/ContextApi'
import { formatCurrency } from '../utils/formatCurrency'
import Spinner from '../utils/Spinner'

export default function Cart() {
  const { error, loading, data } = useFetch(
    'https://ecommtest.onrender.com/products'
  )
  const { bagItems } = useStateContext()
  const getTotal = bagItems?.reduce((total, bagItem) => {
    const totalItem = data.find((i) => i.id === bagItem?.id)
    return total + (totalItem?.price || 0) * bagItem.quantity
  }, 0)

  return (
    <Container style={{ paddingTop: '5rem' }}>
      {bagItems.length ? (
        <h6 className='text-start text-sm font-bold'>
          CART ({bagItems.length})
        </h6>
      ) : (
        <h6 className='text-center text-sm font-bold d-flex justify-content-center align-items-center py-5'>
          your basket is empty
        </h6>
      )}

      {loading && <Spinner />}
      {(error || data) && (
        <div className='h-100'>
          {error && <p className='text-lg text-center'>{error.message}</p>}
          <>
            <p className='py-2 uppercase font-normal mt-4'>
              ITEMS IN THE BASKET ARE NOT RESERVED UNTIL COMPLETING THE
              PURCHASE.
            </p>
            <ResponsiveMasonry
              columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
              className='mx-auto'
            >
              <Masonry gutter='30px'>
                {bagItems.map((item, index) => (
                  <BagItem key={index} {...item} data={data} />
                ))}
              </Masonry>
            </ResponsiveMasonry>
          </>
          <div className='border-t-2 border-black md:border-0 py-2 flex md:flex-row-reverse items-center gap-4 fixed bottom-0 right-20 md:right-20'>
            {/* <Checkout getTotal={getTotal} /> */}
            <div className='flex space-x-3 font-bold text-xs text-slate-900'>
              <p>TOTAL</p>
              <span>{formatCurrency(getTotal)}</span>
            </div>
          </div>
        </div>
      )}
    </Container>
  )
}
