import React, { useEffect, useState } from 'react';
import './Home.css';

// Librerías agregadas para íconos y animaciones
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
  FaFacebookF, FaInstagram, FaWhatsapp, FaCcVisa, FaCcMastercard, FaCcAmex,
  FaMoneyBillWave, FaCheck, FaMapMarkerAlt, FaPhone, FaEnvelope,
  FaSignInAlt, FaUserPlus, FaShoppingCart, FaBreadSlice, FaHome, FaClock
} from 'react-icons/fa';

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import Cart from './Cart';
import CheckoutForm from './CheckoutForm';
import ProductCard from './ProductCard';
import HistorialCompras from './HistorialCompras';
import CompraExitosaModal from './CompraExitosaModal';
import { useUser } from '../context/UserContext';

import { useCart } from '../context/CartContext';

import { useLocation } from 'react-router-dom'

const Home = () => {

  const { user, logout } = useUser();
  const [modalOpen, setModalOpen] = useState(false);
  const { clearCart } = useCart();
  const [modalType, setModalType] = useState(null);
  const [mostrarHistorial, setMostrarHistorial] = useState(false);
  const { cart } = useCart();
  const [redirectAfterLogin, setRedirectAfterLogin] = useState(null);
  const [flujoPendiente, setFlujoPendiente] = useState(null);
  const [resumenCompra, setResumenCompra] = useState(null);
  const [mostrarModalCompra, setMostrarModalCompra] = useState(false);
  const [productosPorCategoria, setProductosPorCategoria] = useState({});

  // 🆕 Inicializar animaciones AOS al cargar el componente
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const location = useLocation();

  useEffect(() => {
    if (location.state?.abrirCarrito) {
      setModalType('cart');
      setModalOpen(true);
    }
  }, [location.state]);

  useEffect(() => {
    const cargarProductos = async () => {
      const categorias = [1, 2, 3, 4, 5];
      const data = {};

      for (const id of categorias) {
        const res = await fetch(`http://localhost:8080/api/productos/categoria/${id}`);
        const productos = await res.json();
        console.log("Categoría:", id, "→ productos:", productos);
        data[id] = productos;
      }

      setProductosPorCategoria(data);
    };

    cargarProductos();
  }, []);

  const renderModalContent = () => {
    switch (modalType) {
      case 'login':
        return (
          <LoginForm
            onSuccess={() => {
              if (flujoPendiente === 'checkout') {
                setModalType('checkout');
              } else if (flujoPendiente === 'cart') {
                setModalType('cart');
              } else {
                setModalOpen(false);
              }
              setFlujoPendiente(null); // Limpia después del redireccionamiento
            }}
            onRegisterSwitch={() => setModalType('register')}
          />
        );
      case 'register':
        return (
          <RegisterForm
            onSuccess={() => setModalOpen(false)}
            onLoginSwitch={() => setModalType('login')}
          />
        );
      case 'cart':
        return (
          <Cart
            onClose={() => setModalOpen(false)}
            onNext={() => setModalType('checkout')}
            openLoginModal={(flujo = 'cart') => {
              setFlujoPendiente(flujo);
              setModalType('login');
              setModalOpen(true);
            }}
          />
        );
      case 'checkout':
        return (
          <CheckoutForm
            onBack={() => setModalType('cart')}
            onNext={(resumen) => {
              setResumenCompra(resumen);     // <-- Guardas datos en el estado
              setMostrarModalCompra(true);   // <-- Activas el modal personalizado
              setModalType(null);            // <-- Cierra la vista de Checkout
            }}
          />
        );
      default:
        return null;
    }
  };

  const productos = [
    { id: 1, nombre: "Pan Francés", precio: 2.00, imagenUrl: "/imagenes/pan-frances.png" },
    { id: 2, nombre: "Empanadas de Pollo", precio: 5.00, imagenUrl: "/imagenes/empanadas-de-pollo.png" },
    { id: 3, nombre: "Pastel de Chocolate", precio: 20.00, imagenUrl: "/imagenes/pastel-de-chocolate.png" },
    { id: 4, nombre: "Pay de manzana", precio: 10.00, imagenUrl: "/imagenes/pay-de-manzana.png" },
    { id: 5, nombre: "Bizcocho de vainilla", precio: 12.00, imagenUrl: "/imagenes/bizcochos-de-vainilla.png" }
  ];

  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(0);
  const categorias = [
    { id: 0, nombre: 'Todo' },
    { id: 1, nombre: 'Pan' },
    { id: 2, nombre: 'Torta' },
    { id: 3, nombre: 'Galleta' },
    { id: 4, nombre: 'Queque' },
    { id: 5, nombre: 'Postre' }
  ];

  return (
    <>
      {/* Barra superior con navegación */}
      <header className="barra-superior">
        <div className="nombre-negocio">Panadería Delicia</div>
        <nav>
          <a href="#"><FaHome /> Inicio</a>
          <a href="#"><FaBreadSlice /> Productos</a>
          <a href="#pedidos"><FaShoppingCart /> Pedidos</a>
        </nav>

        <div className="user-auth">
          {!user ? (
            <>
              <button className="auth-btn" onClick={() => {
                setModalType('login');
                setModalOpen(true);
              }}>
                <FaSignInAlt /> Iniciar Sesión
              </button>
              <button className="auth-btn" onClick={() => {
                setModalType('register');
                setModalOpen(true);
              }}>
                <FaUserPlus /> Registrarse
              </button>
            </>
          ) : (
            <div className="user-info-box">
              <span className="user-name">
                <FaUserPlus style={{ marginRight: '4px' }} />
                {user.nombre}
              </span>
              <button className="logout-btn" onClick={logout} title="Cerrar sesión">🔒</button>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section
        className="hero"
        data-aos="fade-in"
        style={{
            backgroundImage: "url('/imagenes/imagen-hero.jpg')"
        }}
      >
        <div className="hero-content">
            <h1>Panadería y Pastelería Delicia</h1>
            <p className="subtexto">El sabor que enamora</p>
            <div className="hero-text">
            <p>
                Somos una panadería artesanal dedicada a ofrecer panes y pasteles
                frescos todos los días. Usamos ingredientes de calidad y mucho amor.
            </p>
            <button
              className="btn-primario"
              onClick={() => {
                const productosSection = document.getElementById('productos-destacados');
                productosSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Ver Productos
            </button>
            </div>
        </div>
      </section>
      
      {/* Productos destacados estáticos */}
      <section id="productos-destacados" className="destacados" data-aos="fade-up">
        <div className="container">
          <h2 className="titulo-productos">Nuestros Productos Destacados</h2>
          <div className="destacados-grid">
            {productos.map((producto) => (
              <ProductCard key={producto.id} producto={producto} />
            ))}
          </div>
        </div>
      </section>

      {/* Filtros dinámicos por categoría */}
      <div className="filtros-categorias">
        {categorias.map((cat) => (
          <button
            key={cat.id}
            className={`btn-categoria ${categoriaSeleccionada === cat.id ? 'activo' : ''}`}
            onClick={() => setCategoriaSeleccionada(cat.id)}
          >
            {cat.nombre}
          </button>
        ))}
      </div>

      {/* Productos filtrados dinámicamente */}
      <section className="productos-por-categoria" data-aos="fade-up">
        <div className="container">
          <h2 className="titulo-productos">
            {categoriaSeleccionada === 0 ? 'Todos los Productos' : `Categoría: ${categorias.find(c => c.id === categoriaSeleccionada)?.nombre}`}
          </h2>

          {categoriaSeleccionada === 0 ? (
            Object.entries(productosPorCategoria).map(([categoriaId, productos]) =>
              Array.isArray(productos) && productos.length > 0 ? (
                <div key={categoriaId} className="productos-grid">
                  {productos.map((producto) => (
                    <ProductCard key={producto.id} producto={producto} />
                  ))}
                </div>
              ) : null
            )
          ) : Array.isArray(productosPorCategoria[categoriaSeleccionada]) ? (
            <div className="productos-grid">
              {productosPorCategoria[categoriaSeleccionada].map((producto) => (
                <ProductCard key={producto.id} producto={producto} />
              ))}
            </div>
          ) : (
            <p style={{ textAlign: 'center', margin: '2rem 0', color: 'red' }}>
              No se encontraron productos para esta categoría.
            </p>
          )}
        </div>
      </section>

      {/* Sobre nosotros */}
      <section className="sobre-nosotros" data-aos="fade-up">
        <div className="container">
          <div className="sobre-content">
            <div className="sobre-text">
              <h2>Nuestra Historia</h2>
              <p>Desde 1985, Panadería Delicia ha sido un referente en productos artesanales de la más alta calidad.</p>
              <ul className="sobre-lista">
                <li><FaCheck /> Ingredientes 100% naturales</li>
                <li><FaCheck /> Elaboración artesanal</li>
                <li><FaCheck /> Horneado diario</li>
              </ul>
            </div>
            <div className="sobre-img">
              <img src="imagenes/panaderia-interior.jpg" alt="Interior de nuestra panadería" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="testimonios" data-aos="fade-up">
        <div className="container">
          <h2>Lo que dicen nuestros clientes</h2>
          <div className="testimonios-grid">
            {[
              { nombre: "María González", comentario: "El mejor pan francés que he probado. Siempre fresco y delicioso." },
              { nombre: "Carlos Mendoza", comentario: "Las empanadas son increíbles. Siempre pido cuando visito la ciudad." }
            ].map((t, i) => (
              <div className="testimonio-item" key={i} data-aos={i % 2 === 0 ? 'fade-right' : 'fade-left'}>
                <div className="testimonio-text">
                  <p>"{t.comentario}"</p>
                </div>
                <div className="testimonio-autor">
                    <img src="imagenes/usuario.png" alt="Cliente satisfecho" />
                    <div>
                        <h4>{t.nombre}</h4>
                        <span className="cliente-rol">Cliente frecuente</span>
                    </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pedidos */}
      <section id="pedidos" className="pedidos-section" data-aos="fade-up">
        <div className="container">
            <h2 className="titulo-pedidos">🛒 Haz tu Pedido</h2>
            <div className="pedidos-content">
            <div className="pedidos-form">
              <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
                Puedes hacer tu pedido completo desde nuestro catálogo online.
              </p>
              <div className="historial-container">
                <button
                  className="btn-historial"
                  onClick={() => setMostrarHistorial(true)}
                >
                  📜 Ver Historial de Compras
                </button>
              </div>
              <button
                className="btn-primario modal-btn"
                onClick={() => {
                  setModalType('cart');
                  setModalOpen(true);
                }}
              >
                🛒 Ir al Pedido Interactivo
              </button>
            </div>

            <div className="pedidos-info">
                <h3><i className="fas fa-clock"></i> Horario de atención</h3>
                <p>Lunes a Viernes: 7:00 am - 8:00 pm</p>
                <p>Sábados: 7:00 am - 6:00 pm</p>
                <p>Domingos: 8:00 am - 2:00 pm</p>

                <h3><i className="fas fa-money-bill-wave"></i> Métodos de pago</h3>
                <div className="metodos-pago">
                <FaCcVisa />
                <FaCcMastercard />
                <FaCcAmex />
                <FaMoneyBillWave />
                </div>
            </div>
            </div>
        </div>
      </section>

      {/* Pie de página */}
      <footer className="pie-pagina">
        <div className="container">
          <div className="footer-content">
            <div className="footer-col">
              <h3 className="footer-logo">Panadería Delicia</h3>
              <p>El sabor tradicional que tu familia merece.</p>
              <div className="footer-social">
                <a href="#"><FaFacebookF /></a>
                <a href="#"><FaInstagram /></a>
                <a href="#"><FaWhatsapp /></a>
              </div>
            </div>
            <div className="footer-col">
              <h3>Enlaces</h3>
              <ul>
                <li><a href="#">Inicio</a></li>
                <li><a href="#">Productos</a></li>
                <li><a href="#pedidos">Pedidos</a></li>
                <li><a href="#">Términos y condiciones</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h3>Contacto</h3>
              <p><FaMapMarkerAlt /> Calle Panadería 123, Ciudad</p>
              <p><FaPhone /> (123) 456-7890</p>
              <p><FaEnvelope /> info@panaderiadelicia.com</p>
            </div>
            <div className="footer-col">
              <h3>Newsletter</h3>
              <p>Suscríbete para recibir promociones</p>
              <form className="newsletter-form">
                <input type="email" placeholder="Tu correo electrónico" required />
                <button type="submit"><i className="fas fa-paper-plane"></i></button>
              </form>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 Panadería Delicia. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      {modalOpen && modalType && (
        <div className="auth-modal" style={{ display: 'flex' }}>
          <div className="modal-content">
            <span className="close-modal" onClick={() => setModalOpen(false)}>&times;</span>
            {renderModalContent()}
          </div>
        </div>
      )}

      {mostrarHistorial && (
        <div className="auth-modal" style={{ display: 'flex' }}>
          <div className="modal-content">
            <span className="close-modal" onClick={() => setMostrarHistorial(false)}>&times;</span>
            <HistorialCompras />
          </div>
        </div>
      )}

      {/* Botón flotante del carrito */}
      <div className="floating-cart" onClick={() => {
        setModalType('cart');
        setModalOpen(true);
      }}>
        <FaShoppingCart className="cart-icon" />
        {cart.length > 0 && (
          <span className="cart-badge">{cart.length}</span>
        )}
      </div>

      {mostrarModalCompra && resumenCompra && (
        <div className="auth-modal" style={{ display: 'flex' }}>
          <div className="modal-content modal-exitosa">
            <CompraExitosaModal
              visible={true}
              onClose={() => setMostrarModalCompra(false)}
              datos={resumenCompra}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Home;