package com.app.backend.controller;

import com.app.backend.model.Venta;
import com.app.backend.model.DetalleVenta;
import com.app.backend.repository.VentaRepository;
import com.app.backend.repository.DetalleVentaRepository;
import com.app.backend.dto.VentaConDetallesDTO;
import com.app.backend.dto.DetalleVentaDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
@RequestMapping("/api/ventas")
public class VentaController {

    @Autowired
    private VentaRepository ventaRepository;

    @Autowired
    private DetalleVentaRepository detalleVentaRepository;

    @GetMapping
    public List<Venta> listarVentas() {
        return ventaRepository.findAll();
    }

    @GetMapping("/{id}")
    public Venta obtenerVenta(@PathVariable Long id) {
        return ventaRepository.findById(id).orElse(null);
    }

    @GetMapping("/cliente/{clienteId}")
    public List<Venta> ventasPorCliente(@PathVariable Long clienteId) {
        return ventaRepository.findByClienteId(clienteId);
    }

    @PostMapping
    public Venta crearVenta(@RequestBody Venta venta) {
        return ventaRepository.save(venta);
    }

    @PostMapping("/registrar")
    public ResponseEntity<String> registrarPedidoCompleto(@RequestBody VentaConDetallesDTO dto) {
        Venta venta = new Venta();

        // 🛠 Conversión Integer -> Long
        venta.setClienteId(dto.getClienteId().longValue());
        venta.setFormaEntrega(dto.getFormaEntrega());
        venta.setTipoPago(dto.getTipoPago());
        venta.setEstado("completado");
        venta.setTotal(dto.getTotal());
        venta.setDireccionEntrega(dto.getDireccion());

        // 💾 Guardar venta primero
        Venta ventaGuardada = ventaRepository.save(venta);

        // 🧾 Guardar cada detalle con setVentaId (no setVenta)
        for (DetalleVentaDTO det : dto.getDetalles()) {
            DetalleVenta dv = new DetalleVenta();
            dv.setVentaId(ventaGuardada.getId());
            dv.setProductoId(det.getProductoId());
            dv.setCantidad(det.getCantidad());
            dv.setPrecioUnitario(det.getPrecioUnitario());
            detalleVentaRepository.save(dv);
        }

        return ResponseEntity.ok("Venta y detalles registrados correctamente.");
    }

    @DeleteMapping("/{id}")
    public void eliminarVenta(@PathVariable Long id) {
        ventaRepository.deleteById(id);
    }
}
