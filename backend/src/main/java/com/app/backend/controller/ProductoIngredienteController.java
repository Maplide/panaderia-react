package com.app.backend.controller;

import com.app.backend.model.ProductoIngrediente;
import com.app.backend.repository.ProductoIngredienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/productos-ingredientes")
public class ProductoIngredienteController {

    @Autowired
    private ProductoIngredienteRepository repository;

    @GetMapping
    public List<ProductoIngrediente> listarTodos() {
        return repository.findAll();
    }

    @GetMapping("/producto/{productoId}")
    public List<ProductoIngrediente> listarPorProducto(@PathVariable Long productoId) {
        return repository.findByProductoId(productoId);
    }

    @PostMapping
    public ProductoIngrediente crear(@RequestBody ProductoIngrediente pi) {
        return repository.save(pi);
    }

    @GetMapping("/{id}")
    public ProductoIngrediente obtener(@PathVariable Long id) {
        return repository.findById(id).orElse(null);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
