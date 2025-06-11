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
    <div className="historial-compras">
      <h3>🧾 Historial de Compras</h3>

      {ventasPagina.length === 0 ? (
        <p>No tienes pedidos registrados.</p>
      ) : (
        <>
          <ul>
            {ventasPagina.map((venta) => (
              <li key={venta.id} style={{ marginBottom: '1rem', borderBottom: '1px solid #ccc', paddingBottom: '0.5rem' }}>
                <p><strong>ID:</strong> {venta.id}</p>
                <p><strong>Fecha:</strong> {new Date(venta.fecha).toLocaleString()}</p>
                <p><strong>Total:</strong> S/ {venta.total?.toFixed(2)}</p>
                <p><strong>Forma de Entrega:</strong> {venta.formaEntrega}</p>
                <p><strong>Pago:</strong> {venta.tipoPago}</p>
              </li>
            ))}
          </ul>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
            <button onClick={() => cambiarPagina(-1)} disabled={paginaActual === 1}>Anterior</button>
            <span>Página {paginaActual} de {totalPaginas}</span>
            <button onClick={() => cambiarPagina(1)} disabled={paginaActual === totalPaginas}>Siguiente</button>
          </div>
        </>
      )}
    </div>
  );
};

export default HistorialCompras;
