package com.app.backend.controller;

import com.app.backend.model.Cliente;
import com.app.backend.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Optional;

@RestController
@RequestMapping("/api/clientes")

public class ClienteController {

    @Autowired
    private ClienteRepository clienteRepository;

    @PostMapping("/registrar")
    public Cliente registrar(@RequestBody Cliente cliente) {
        Optional<Cliente> existente = clienteRepository.findByEmail(cliente.getEmail());
        if (existente.isPresent()) {
            throw new RuntimeException("El correo ya está registrado.");
        }

        cliente.setEstado("activo");
        return clienteRepository.save(cliente);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Cliente cliente) {
        Optional<Cliente> encontrado = clienteRepository.findByEmailAndPassword(cliente.getEmail(), cliente.getPassword());

        if (encontrado.isPresent()) {
            return ResponseEntity.ok(encontrado.get());
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Correo o contraseña incorrectos.");
        }
    }
}
