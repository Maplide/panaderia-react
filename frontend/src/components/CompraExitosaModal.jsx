import React from 'react';
import './Home.css';

const CompraExitosaModal = ({ visible, onClose, datos }) => {
  if (!visible || !datos) return null;

  const { nombre, direccion, entrega, pago, total } = datos;

  return (
    <>
      <h2>✅ ¡Compra Realizada!</h2>
      <div className="modal-detalle">
        <p><strong>👤 Cliente:</strong> {nombre}</p>
        <p><strong>🚚 Entrega:</strong> {entrega === 'delivery' ? 'Delivery a domicilio' : 'Recojo en tienda'}</p>
        {entrega === 'delivery' && (
          <p><strong>📍 Dirección:</strong> {direccion}</p>
        )}
        <p><strong>💳 Pago:</strong> {pago.toUpperCase()}</p>
        <p className="total-final"><strong>💰 Total:</strong> S/ {total.toFixed(2)}</p>
      </div>
      <button className="btn-primario" onClick={onClose}>Aceptar</button>
    </>
  );
};

export default CompraExitosaModal;