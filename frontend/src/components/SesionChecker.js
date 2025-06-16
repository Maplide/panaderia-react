// src/components/SesionChecker.js
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import { useUser } from '../context/UserContext'; // ⬅️ Importa esto


function SesionChecker() {
  const [mostrarModal, setMostrarModal] = useState(false);
  const { logout } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const intervalo = setInterval(() => {
      fetch("http://localhost:8080/api/clientes/perfil", {
        credentials: "include"
      })
        .then(res => {
          if (!res.ok) throw new Error("Sesión expirada");
        })
        .catch(() => setMostrarModal(true));
    }, 30000); // cada 30 segundos

    return () => clearInterval(intervalo);
  }, []);

  const cerrarSesion = () => {
    fetch("http://localhost:8080/api/clientes/logout", {
        method: "POST",
        credentials: "include"
    }).finally(() => {
        logout(); // ⬅️ Esto actualiza el estado global
        setMostrarModal(false);
        navigate("/"); // redirige al home
    });
  };

  return (
    <Modal show={mostrarModal} backdrop="static" keyboard={false} centered>
      <Modal.Header>
        <Modal.Title>Sesión expirada</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Tu sesión ha expirado por inactividad. Por favor, inicia sesión nuevamente.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={cerrarSesion}>
          Ir al inicio
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SesionChecker;
