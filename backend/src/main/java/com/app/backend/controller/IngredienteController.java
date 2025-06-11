package com.app.backend.controller;

import com.app.backend.model.Ingrediente;
import com.app.backend.repository.IngredienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ingredientes")
public class IngredienteController {

    @Autowired
    private IngredienteRepository ingredienteRepository;

    @GetMapping
    public List<Ingrediente> listarIngredientes() {
        return ingredienteRepository.findAll();
    }

    @PostMapping
    public Ingrediente agregarIngrediente(@RequestBody Ingrediente ingrediente) {
        return ingredienteRepository.save(ingrediente);
    }

    @GetMapping("/{id}")
    public Ingrediente obtenerIngrediente(@PathVariable Long id) {
        return ingredienteRepository.findById(id).orElse(null);
    }
}
