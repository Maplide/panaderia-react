import React, { useState } from 'react';
import { useUser } from '../context/UserContext';

const RegisterForm = ({ onLoginSwitch, onSuccess }) => {
  const { login } = useUser();

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
        login(nuevoCliente); // Guarda el usuario
        onSuccess(); // Cierra el modal
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
      <h2>📝 Registro de Nuevo Cliente</h2>
      <form onSubmit={handleRegister}>
        <input name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} required />
        <input name="apellido" placeholder="Apellido" value={formData.apellido} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Correo electrónico" value={formData.email} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Contraseña" value={formData.password} onChange={handleChange} required />
        <input name="telefono" placeholder="Teléfono" value={formData.telefono} onChange={handleChange} required />
        <textarea name="direccion" placeholder="Dirección" value={formData.direccion} onChange={handleChange} required />
        <input name="dni" placeholder="DNI" value={formData.dni} onChange={handleChange} required />
        <input name="fecha_nacimiento" type="date" value={formData.fecha_nacimiento} onChange={handleChange} required />
        <select name="genero" value={formData.genero} onChange={handleChange} required>
          <option value="M">Masculino</option>
          <option value="F">Femenino</option>
          <option value="Otro">Otro</option>
        </select>

        <button type="submit">Registrarse</button>
      </form>

      <p style={{ marginTop: '1rem' }}>
        ¿Ya tienes cuenta? <button onClick={onLoginSwitch}>Iniciar Sesión</button>
      </p>
    </div>
  );
};

export default RegisterForm;
