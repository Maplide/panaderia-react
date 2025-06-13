import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const RegisterForm = ({ onLoginSwitch, onSuccess }) => {
  const { login } = useUser();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    telefono: '',
    direccion: '',
    dni: '',
    fecha_nacimiento: '',
    genero: 'M',
  });

  useEffect(() => {
    // Guardar ruta previa si viene del carrito
    const previousRoute = window.location.pathname;
    if (previousRoute === "/carrito") {
      localStorage.setItem("redirigir_despues", "/carrito");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const { nombre, email, password } = formData;

    if (!nombre || !email || !password) {
      alert('Por favor completa todos los campos');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/clientes/registrar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, estado: 'activo' })
      });

      if (response.ok) {
        const nuevoCliente = await response.json();
        login(nuevoCliente); // Guarda en contexto
        const destino = localStorage.getItem("redirigir_despues");
        localStorage.removeItem("redirigir_despues");

        if (destino === "checkout") {
          navigate("/", { state: { abrirCarrito: true } });
        } else {
          navigate("/");
        }
      } else {
        alert('Error al registrar. Verifica que el correo no esté en uso.');
      }
    } catch (error) {
      console.error('Error en registro:', error);
      alert('Hubo un problema con el servidor.');
    }
  };

  return (
    <div className="modal-register">
      <h2>📝 Registro</h2>
      <form onSubmit={handleRegister}>
        <input name="nombre" placeholder="Nombre" onChange={handleChange} />
        <input name="apellido" placeholder="Apellido" onChange={handleChange} />
        <input name="email" placeholder="Correo" onChange={handleChange} />
        <input name="password" type="password" placeholder="Contraseña" onChange={handleChange} />
        <input name="telefono" placeholder="Teléfono" onChange={handleChange} />
        <input name="direccion" placeholder="Dirección" onChange={handleChange} />
        <input name="dni" placeholder="DNI" onChange={handleChange} />
        <input name="fecha_nacimiento" type="date" onChange={handleChange} />
        <select name="genero" onChange={handleChange}>
          <option value="M">Masculino</option>
          <option value="F">Femenino</option>
        </select>
        <button type="submit">Crear Cuenta</button>
      </form>
      <p>¿Ya tienes una cuenta? <button onClick={onLoginSwitch}>Iniciar Sesión</button></p>
    </div>
  );
};

export default RegisterForm;
