package com.app.backend.controller;

import com.app.backend.model.Producto;
import com.app.backend.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.util.List;

@RestController
@RequestMapping("/api/productos")
public class ProductoController {

    @Autowired
    private ProductoRepository productoRepository;

    @GetMapping
    public List<Producto> listarProductos() {
        return productoRepository.findAll();
    }

    @PostMapping
    public Producto agregarProducto(@RequestBody Producto producto) {
        return productoRepository.save(producto);
    }

    @GetMapping("/{id}")
    public Producto obtenerProducto(@PathVariable Long id) {
        return productoRepository.findById(id).orElse(null);
    }

    @GetMapping("/categoria/{categoriaId}")
    public ResponseEntity<List<Producto>> productosPorCategoria(@PathVariable Long categoriaId) {
        List<Producto> productos = productoRepository.findByCategoria_Id(categoriaId);
        return ResponseEntity.ok(productos);
    }
}
