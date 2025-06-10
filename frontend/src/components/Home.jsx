import React, { useEffect, useState } from 'react';
import './Home.css';

// 🆕 Librerías agregadas para íconos y animaciones
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
  FaFacebookF, FaInstagram, FaWhatsapp, FaCcVisa, FaCcMastercard, FaCcAmex,
  FaMoneyBillWave, FaCheck, FaMapMarkerAlt, FaPhone, FaEnvelope,
  FaSignInAlt, FaUserPlus, FaShoppingCart, FaBreadSlice, FaHome, FaClock
} from 'react-icons/fa';

const Home = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const [registerData, setRegisterData] = useState({
    nombre: '',
    email: '',
    password: ''
  });

  // 🆕 Inicializar animaciones AOS al cargar el componente
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/usuarios/registro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(registerData)
      });

      if (response.ok) {
        const data = await response.json();
        alert('Usuario registrado con éxito: ' + data.nombre);
        setShowRegister(false);
        setRegisterData({ nombre: '', email: '', password: '' });
      } else {
        alert('Error al registrar usuario');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error de red o servidor');
    }
  };

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
          <button className="auth-btn" onClick={() => setShowLogin(true)}>
            <FaSignInAlt /> Iniciar Sesión
          </button>
          <button className="auth-btn" onClick={() => setShowRegister(true)}>
            <FaUserPlus /> Registrarse
          </button>
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
            <a href="productos.html" className="btn-primario">
                Ver Productos
            </a>
            </div>
        </div>
      </section>

      {/* Modal Login */}
      {showLogin && (
        <div className="auth-modal" style={{ display: 'flex' }}>
            <div className="modal-content modal-anim">
            <span className="close-modal" onClick={() => setShowLogin(false)}>&times;</span>
            <h2 className="modal-title">Iniciar Sesión</h2>
                <form>
                    <div className="form-group">
                    <label>Correo Electrónico</label>
                    <div className="input-icon">
                        <input type="email" required />
                        <i className="fas fa-envelope"></i>
                    </div>
                    </div>
                    <div className="form-group">
                    <label>Contraseña</label>
                    <div className="input-icon">
                        <input type="password" required />
                        <i className="fas fa-lock"></i>
                    </div>
                    </div>
                    <button type="submit" className="btn-primario modal-btn">Ingresar</button>
                </form>
            </div>
        </div>
      )}

      {/* Modal Registro */}
      {showRegister && (
        <div className="auth-modal" style={{ display: 'flex' }}>
            <div className="modal-content modal-anim">
            <span className="close-modal" onClick={() => setShowRegister(false)}>&times;</span>
            <h2 className="modal-title">Registrarse</h2>
                <form onSubmit={handleRegisterSubmit}>
                    <div className="form-group">
                    <label>Nombre Completo</label>
                    <div className="input-icon">
                        <input type="text" value={registerData.nombre} onChange={(e) => setRegisterData({ ...registerData, nombre: e.target.value })} required />
                        <i className="fas fa-user"></i>
                    </div>
                    </div>
                    <div className="form-group">
                    <label>Correo Electrónico</label>
                    <div className="input-icon">
                        <input type="email" value={registerData.email} onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })} required />
                        <i className="fas fa-envelope"></i>
                    </div>
                    </div>
                    <div className="form-group">
                    <label>Contraseña</label>
                    <div className="input-icon">
                        <input type="password" value={registerData.password} onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })} required />
                        <i className="fas fa-lock"></i>
                    </div>
                    </div>
                    <button type="submit" className="btn-primario modal-btn">Registrarse</button>
                </form>
            </div>
        </div>
      )}

      {/* Productos destacados */}
      <section className="destacados" data-aos="fade-up">
        <div className="container">
          <h2 className="titulo-productos">Nuestros Productos Destacados</h2>
          <div className="destacados-grid">
            {/* 🆕 Podrías animar individualmente cada item si deseas */}
            {[
              { nombre: "Pan Francés", precio: "S/2.00", imagen: "pan-frances.png", descripcion: "Recién horneado todos los días" },
              { nombre: "Empanadas de Pollo", precio: "S/5.00", imagen: "empanadas-de-pollo.png", descripcion: "Rellenas con ingredientes frescos" },
              { nombre: "Pastel de Chocolate", precio: "S/20.00", imagen: "pastel-de-chocolate.png", descripcion: "Puro sabor en cada rebanada" },
              { nombre: "Pay de manzana", precio: "S/10.00", imagen: "pay-de-manzana.png", descripcion: "Dulce sabor a manzana" },
              { nombre: "Bizcocho de vainilla", precio: "S/12.00", imagen: "bizcochos-de-vainilla.png", descripcion: "Un sabor que gusta" }
            ].map((item, i) => (
              <div className="destacado-item" key={i} data-aos="zoom-in">
                <img src={`imagenes/${item.imagen}`} alt={item.nombre} className="zoom-img" />
                <h3>{item.nombre}</h3>
                <p>{item.descripcion}</p>
                <span className="precio">{item.precio}</span>
              </div>
            ))}
          </div>
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
            <form className="pedidos-form">
                <div className="form-group">
                <label><i className="fas fa-user"></i> Nombre completo</label>
                <input type="text" required />
                </div>
                <div className="form-group">
                <label><i className="fas fa-phone-alt"></i> Teléfono</label>
                <input type="tel" required />
                </div>
                <div className="form-group">
                <label><i className="fas fa-bread-slice"></i> ¿Qué deseas ordenar?</label>
                <select required>
                    <option value="">Selecciona un producto</option>
                    <option>Pan Francés</option>
                    <option>Empanada de Pollo</option>
                    <option>Pastel de Chocolate</option>
                    <option>Bizcocho de Vainilla</option>
                    <option>Pay de Manzana</option>
                </select>
                </div>
                <div className="form-group">
                <label><i className="fas fa-sort-numeric-up-alt"></i> Cantidad</label>
                <input type="number" min="1" required />
                </div>
                <div className="form-group">
                <label><i className="fas fa-calendar-alt"></i> Fecha de recolección</label>
                <input type="date" required />
                </div>
                <button type="submit" className="btn-primario modal-btn">Enviar Pedido</button>
            </form>

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
    </>
  );
};

export default Home;