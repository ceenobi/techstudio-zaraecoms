import { createContext, useContext, useState, useEffect } from 'react'

//shopping cart requires add, increatse, decrease, total, qualtity
//first create a usestatte to hold the values of our cart itmems
//our cart will have the id and qty cos with the id we can look up info on the product and with the qty we can calc the qty times price.we could add more info like name but using id regsiters itto the product to ensure no future chganges get mising

//getqty takes a param with of id and looks into our cart item and finds the id of the current cart is equal to the id of the product and if the value exists we return a quantity of the product or default it to zero

//incqty we look at te setcartitems which is for updating the state of our cart and use a curritems key to look into it. if we can find an item in our cart then we have an item, if we dont, then we add the new item with id and a qty of one, else if we already have an item in cart then we use the map functon to map and then if the item.id is same with our id in bag then we spread, take the qty and increase it by 1 else return the item without any change

//decqty we check if the qty is equal to 1, it we have that then we filter the item where the item id of our database is not equal to the id of our cart.then we map over our products and chack if the item id is same with our id and if same we deduct minus 1

//removefrom cart here we filter out items where the item id is not equal to the our curr item id

const Context = createContext()

let initialState = []

export const StateContext = ({ children }) => {
  const [bagItems, setBagItems] = useState(initialState)
  console.log('bagitems', bagItems)

  //save bag to localstoroage
  useEffect(() => {
    const bagData = JSON.parse(localStorage.getItem('updatedBag'))
    if (bagData) {
      setBagItems(bagData)
    }
  }, [])

  useEffect(() => {
    if (bagItems !== initialState) {
      localStorage.setItem('updatedBag', JSON.stringify(bagItems))
    }
  }, [bagItems])

  //addTobag

  const bagQuantity = bagItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  )

  const getItemQuantity = (id) => {
    return bagItems.find((item) => item.id === id)?.quantity || 0
  }

  const increaseBagQuantity = (id) => {
    setBagItems((currItems) => {
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }]
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 }
          } else {
            return item
          }
        })
      }
    })
  }

  const decreaseBagQuantity = (id) => {
    setBagItems((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id)
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 }
          } else {
            return item
          }
        })
      }
    })
  }

  const removeFromBag = (id) => {
    setBagItems((currItems) => {
      return currItems.filter((item) => item.id !== id)
    })
  }

  return (
    <Context.Provider
      value={{
        bagQuantity,
        getItemQuantity,
        increaseBagQuantity,
        decreaseBagQuantity,
        removeFromBag,
        bagItems,
        setBagItems,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context)
