package com.app.backend.controller;

import com.app.backend.model.Empleado;
import com.app.backend.repository.EmpleadoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/empleados")
public class EmpleadoController {

    @Autowired
    private EmpleadoRepository empleadoRepository;

    @GetMapping
    public List<Empleado> listar() {
        return empleadoRepository.findAll();
    }

    @PostMapping
    public Empleado crear(@RequestBody Empleado empleado) {
        return empleadoRepository.save(empleado);
    }

    @GetMapping("/{id}")
    public Empleado obtener(@PathVariable Long id) {
        return empleadoRepository.findById(id).orElse(null);
    }

    @GetMapping("/usuario/{usuario}")
    public Empleado buscarPorUsuario(@PathVariable String usuario) {
        return empleadoRepository.findByUsuario(usuario).orElse(null);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        empleadoRepository.deleteById(id);
    }
}
