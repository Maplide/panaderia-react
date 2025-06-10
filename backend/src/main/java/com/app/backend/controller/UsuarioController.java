package com.app.backend.controller;

import com.app.backend.model.Usuario;
import com.app.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    // Registro de usuario (sin cambios)
    @PostMapping("/registro")
    public Usuario registrar(@RequestBody Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    // ✅ Login corregido para retornar JSON
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody Usuario usuario) {
        Optional<Usuario> u = usuarioRepository.findByEmailAndPassword(
                usuario.getEmail(), usuario.getPassword()
        );

        Map<String, String> response = new HashMap<>();

        if (u.isPresent()) {
            response.put("mensaje", "Login exitoso");
            response.put("nombre", u.get().getNombre());
            response.put("email", u.get().getEmail());
            return ResponseEntity.ok(response);
        } else {
            response.put("mensaje", "Credenciales incorrectas");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }

    // Obtener todos los usuarios
    @GetMapping
    public List<Usuario> obtenerUsuarios() {
        return usuarioRepository.findAll();
    }
}
