package com.app.backend.controller;

import com.app.backend.model.Categoria;
import com.app.backend.repository.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/categorias")
public class CategoriaController {

    @Autowired
    private CategoriaRepository categoriaRepository;

    // Obtener todas las categorías
    @GetMapping
    public List<Categoria> listarCategorias() {
        return categoriaRepository.findAll();
    }

    // Obtener una categoría por ID
    @GetMapping("/{id}")
    public Optional<Categoria> obtenerCategoria(@PathVariable Long id) {
        return categoriaRepository.findById(id);
    }

    // Crear nueva categoría
    @PostMapping
    public Categoria crearCategoria(@RequestBody Categoria categoria) {
        return categoriaRepository.save(categoria);
    }

    // Actualizar categoría
    @PutMapping("/{id}")
    public Categoria actualizarCategoria(@PathVariable Long id, @RequestBody Categoria categoriaActualizada) {
        return categoriaRepository.findById(id).map(categoria -> {
            categoria.setNombre(categoriaActualizada.getNombre());
            categoria.setDescripcion(categoriaActualizada.getDescripcion());
            categoria.setTipo(categoriaActualizada.getTipo());
            categoria.setImagenUrl(categoriaActualizada.getImagenUrl());
            categoria.setPopularidad(categoriaActualizada.getPopularidad());
            categoria.setDestacado(categoriaActualizada.isDestacado());
            categoria.setEstado(categoriaActualizada.getEstado());
            categoria.setCodigoCategoria(categoriaActualizada.getCodigoCategoria());
            categoria.setOrden(categoriaActualizada.getOrden());
            categoria.setObservaciones(categoriaActualizada.getObservaciones());
            return categoriaRepository.save(categoria);
        }).orElseGet(() -> {
            categoriaActualizada.setId(id);
            return categoriaRepository.save(categoriaActualizada);
        });
    }

    // Eliminar categoría
    @DeleteMapping("/{id}")
    public void eliminarCategoria(@PathVariable Long id) {
        categoriaRepository.deleteById(id);
    }
}
