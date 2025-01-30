import { useEffect, useReducer } from 'react';

import axios from 'axios';

import { cartReducer, initialState } from './cartReducer.js';

import {
  CART_FETCH_ERROR,
  CART_FETCH_INIT,
  CART_FETCH_SUCCESS,
  CLEAR_ALL,
  DECREASE_ITEM,
  INCREASE_ITEM,
  REMOVE_ITEM,
} from './actions.js';

import CartContainer from './components/CartContainer.jsx';
import Navbar from './components/Navbar.jsx';

const URL = 'https://www.course-api.com/react-useReducer-cart-project';

export default function App() {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const fetchItems = async () => {
    dispatch({ type: CART_FETCH_INIT });

    try {
      const { data } = await axios(URL);
      dispatch({ type: CART_FETCH_SUCCESS, payload: data });
    } catch (error) {
      console.log(error);
      dispatch({ type: CART_FETCH_ERROR });
    }
  };

  const handleClearCart = () => {
    dispatch({ type: CLEAR_ALL });
  };

  const handleRemoveItem = (id) => {
    dispatch({ type: REMOVE_ITEM, payload: id });
  };

  const handleIncreaseItem = (id) => {
    dispatch({ type: INCREASE_ITEM, payload: id });
  };

  const handleDecreaseItem = (id) => {
    dispatch({ type: DECREASE_ITEM, payload: id });
  };

  useEffect(() => {
    fetchItems();
  }, []);

  if (state.isLoading) {
    return (
      <main>
        <div>Chargement...</div>
      </main>
    );
  }

  if (state.isError) {
    return (
      <main>
        <h1>Une erreur s&apos;est produite</h1>
      </main>
    );
  }

  return (
    <>
      <Navbar cart={state.data} />

      <CartContainer
        cart={state.data}
        onClearCart={handleClearCart}
        onRemoveItem={handleRemoveItem}
        onIncreaseItem={handleIncreaseItem}
        onDecreaseItem={handleDecreaseItem}
      />
    </>
  );
}
