package com.app.backend.repository;

import com.app.backend.model.Venta;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VentaRepository extends JpaRepository<Venta, Long> {
    List<Venta> findByClienteId(Long clienteId);
}
