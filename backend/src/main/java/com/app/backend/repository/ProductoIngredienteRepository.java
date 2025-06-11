package com.app.backend.repository;

import com.app.backend.model.ProductoIngrediente;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductoIngredienteRepository extends JpaRepository<ProductoIngrediente, Long> {
    List<ProductoIngrediente> findByProductoId(Long productoId);
}
