import React, { useState } from 'react';
import { useUser } from '../context/UserContext';

const LoginForm = ({ onRegisterSwitch, onSuccess }) => {
  const { login } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const res = await fetch(`http://localhost:8080/api/clientes/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
        });

        if (res.ok) {
        const cliente = await res.json();
        login(cliente);
        onSuccess();
        } else {
        alert('Credenciales incorrectas.');
        }
    } catch (error) {
        console.error('Login error:', error);
        alert('Error al intentar iniciar sesión');
    }
  };

  return (
    <div className="modal-login">
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span role="img" aria-label="lock">🔐</span> Iniciar Sesión
        </h2>
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            /><br/>
            <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            /><br/>
            <button type="submit">Ingresar</button>
        </form>
        <p style={{ marginTop: '1rem' }}>
            ¿No tienes cuenta? <button onClick={onRegisterSwitch}>Registrarse</button>
        </p>
    </div>
  );
};

export default LoginForm;
