import React from 'react';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';

const Summary = ({ onBack, onClose, formaEntrega, tipoPago }) => {
  const { cart, clearCart } = useCart();
  const { user } = useUser();

  const total = cart.reduce((sum, item) => sum + item.precio * item.cantidad, 0);

  const handleConfirm = async () => {
    if (!user) {
      alert("Debes iniciar sesión para confirmar el pedido.");
      return;
    }

    const payload = {
      clienteId: user.id,
      formaEntrega,
      tipoPago,
      total,
      detalles: cart.map((item) => ({
        productoId: item.id,
        cantidad: item.cantidad,
        precioUnitario: item.precio
      }))
    };

    try {
      const res = await fetch('http://localhost:8080/api/ventas/registrar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        clearCart();
        alert('✅ Pedido registrado con éxito. Gracias por tu compra.');
        onClose();
      } else {
        alert('❌ Error al registrar el pedido.');
      }
    } catch (error) {
      console.error('Error en el pedido:', error);
      alert('❌ Error al conectar con el servidor.');
    }
  };

  return (
    <div>
      <h2>🧾 Resumen del Pedido</h2>
      <p><strong>Cliente:</strong> {user?.nombre}</p>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            {item.nombre} x{item.cantidad} – S/ {item.precio.toFixed(2)}
          </li>
        ))}
      </ul>
      <p><strong>Total:</strong> S/ {total}</p>

      <div style={{ marginTop: '1rem' }}>
        <button onClick={onBack}>Atrás</button>
        <button onClick={handleConfirm}>Confirmar Pedido</button>
      </div>
    </div>
  );
};

export default Summary;
