import React from 'react';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa';

const Cart = ({ onNext, onClose, openLoginModal }) => {
  const { cart, addToCart, removeFromCart, decreaseQuantity } = useCart();
  const { user } = useUser();
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.precio * item.cantidad, 0).toFixed(2);

  const handleConfirm = () => {
    if (!user) {
      localStorage.setItem("redirigir_despues", "checkout");

      if (openLoginModal) {
        openLoginModal('checkout');
      } else {
        navigate("/registro");
      }
    } else {
      onNext(); // Avanzar al formulario de entrega
    }
  };

  return (
    <div className="modal-cart">
      <h2>🛒 Tu Carrito</h2>

      {cart.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <ul className="cart-list">
          {cart.map((item) => (
            <li key={item.id} className="cart-item">
              <img src={item.imagenUrl || item.imagen_url} alt={item.nombre} className="cart-img" />
              <div className="cart-info">
                <h4>{item.nombre}</h4>
                <p>S/ {item.precio.toFixed(2)} x {item.cantidad}</p>
                <div className="cart-actions">
                  <button onClick={() => decreaseQuantity(item.id)}><FaMinus /></button>
                  <span>{item.cantidad}</span>
                  <button onClick={() => addToCart(item)}><FaPlus /></button>
                  <button onClick={() => removeFromCart(item.id)} className="delete-btn"><FaTrash /></button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {cart.length > 0 && (
        <div className="cart-footer">
          <p className="total"><strong>Total:</strong> S/ {total}</p>
          <button className="btn-primario" onClick={handleConfirm}>Confirmar Pedido</button>
        </div>
      )}

      <button className="btn-secundario cerrar-btn" onClick={onClose}>Cerrar</button>
    </div>
  );
};

export default Cart;
