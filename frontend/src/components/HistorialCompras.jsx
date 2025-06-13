import React, { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';

const HistorialCompras = () => {
  const { user } = useUser();
  const [ventas, setVentas] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const ventasPorPagina = 5;

  useEffect(() => {
    if (user?.id) {
      fetch(`http://localhost:8080/api/ventas/cliente/${user.id}`)
        .then(res => res.json())
        .then(data => setVentas(data))
        .catch(err => console.error('Error al obtener ventas:', err));
    }
  }, [user]);

  const totalPaginas = Math.ceil(ventas.length / ventasPorPagina);
  const ventasPagina = ventas.slice((paginaActual - 1) * ventasPorPagina, paginaActual * ventasPorPagina);

  const cambiarPagina = (dir) => {
    setPaginaActual(prev => Math.max(1, Math.min(prev + dir, totalPaginas)));
  };

  return (
    <div className="historial-container">
      <h3 style={{ textAlign: 'center', marginBottom: '1rem' }}>🧾 Historial de Compras</h3>

      {ventasPagina.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No tienes pedidos registrados.</p>
      ) : (
        <>
          {ventasPagina.map((venta) => (
            <div className="historial-item" key={venta.id}>
              <h4>Pedido #{venta.id}</h4>
              <div className="historial-fecha">📅 {new Date(venta.fecha).toLocaleString()}</div>
              <ul className="historial-detalle">
                {venta.detalles?.map((detalle, index) => (
                  <li key={index}>
                    {detalle.nombreProducto} × {detalle.cantidad} — S/ {(detalle.precioUnitario * detalle.cantidad).toFixed(2)}
                  </li>
                ))}
              </ul>
              <div className="historial-total">💰 Total: S/ {venta.total?.toFixed(2)}</div>
              <p style={{ marginTop: '5px' }}>
                🚚 Entrega: <strong>{venta.formaEntrega}</strong><br />
                💳 Pago: <strong>{venta.tipoPago}</strong>
              </p>
            </div>
          ))}

          <div className="paginacion">
            <button onClick={() => cambiarPagina(-1)} disabled={paginaActual === 1}>⏪ Anterior</button>
            <span style={{ alignSelf: 'center' }}>Página {paginaActual} de {totalPaginas}</span>
            <button onClick={() => cambiarPagina(1)} disabled={paginaActual === totalPaginas}>Siguiente ⏩</button>
          </div>
        </>
      )}
    </div>
  );
};

export default HistorialCompras;
