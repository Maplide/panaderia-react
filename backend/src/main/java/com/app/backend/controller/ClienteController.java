package com.app.backend.controller;

import com.app.backend.model.Cliente;
import com.app.backend.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.util.Optional;

@RestController
@RequestMapping("/api/clientes")
public class ClienteController {

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/registrar")
    public ResponseEntity<?> registrar(@RequestBody Cliente cliente) {
        Optional<Cliente> existente = clienteRepository.findByEmail(cliente.getEmail());
        if (existente.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("El correo ya está registrado.");
        }

        cliente.setPassword(passwordEncoder.encode(cliente.getPassword())); // 👈 hashear
        cliente.setEstado("activo");
        Cliente guardado = clienteRepository.save(cliente);
        return ResponseEntity.ok(guardado);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Cliente cliente) {
        Optional<Cliente> encontrado = clienteRepository.findByEmail(cliente.getEmail());

        if (encontrado.isPresent()) {
            Cliente clienteBD = encontrado.get();

            if (passwordEncoder.matches(cliente.getPassword(), clienteBD.getPassword())) {
                return ResponseEntity.ok(clienteBD); // ✅ Login correcto
            }
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Correo o contraseña incorrectos.");
    }
}
