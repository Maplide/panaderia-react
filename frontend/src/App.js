import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import CheckoutForm from './components/CheckoutForm';
import { CartProvider } from './context/CartContext';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <Router>
      <UserProvider>
        <CartProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/checkout" element={<CheckoutForm />} />
          </Routes>
        </CartProvider>
      </UserProvider>
    </Router>
  );
}

export default App;