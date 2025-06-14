import React from 'react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ producto }) => {
  const { addToCart } = useCart();

  return (
    <div className="product-card destacado-item" data-aos="zoom-in">
      <img src={producto.imagenUrl} alt={producto.nombre} className="product-img" />
      <div className="product-info">
        <h3>{producto.nombre}</h3>
        <p className="product-price">S/ {producto.precio.toFixed(2)}</p>
        <button className="btn-add-cart" onClick={() => addToCart(producto)}>
          🛒 Agregar al carrito
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
