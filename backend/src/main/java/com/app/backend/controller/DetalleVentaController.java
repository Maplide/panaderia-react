package com.app.backend.controller;

import com.app.backend.model.DetalleVenta;
import com.app.backend.repository.DetalleVentaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/detalles")
public class DetalleVentaController {

    @Autowired
    private DetalleVentaRepository detalleVentaRepository;

    @GetMapping
    public List<DetalleVenta> listarDetalles() {
        return detalleVentaRepository.findAll();
    }

    @GetMapping("/venta/{ventaId}")
    public List<DetalleVenta> obtenerPorVenta(@PathVariable Long ventaId) {
        return detalleVentaRepository.findByVentaId(ventaId);
    }

    @PostMapping
    public DetalleVenta crearDetalle(@RequestBody DetalleVenta detalle) {
        return detalleVentaRepository.save(detalle);
    }

    @DeleteMapping("/{id}")
    public void eliminarDetalle(@PathVariable Long id) {
        detalleVentaRepository.deleteById(id);
    }
}
