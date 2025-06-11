package com.app.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "detalle_venta")
public class DetalleVenta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "venta_id")
    private Long ventaId;

    @Column(name = "producto_id")
    private Long productoId;

    private int cantidad;

    @Column(name = "precio_unitario")
    private double precioUnitario;

    private String descripcion;

    @Column(name = "descuento_item")
    private Double descuentoItem;

    @Column(name = "tipo_presentacion")
    private String tipoPresentacion;

    @Column(name = "codigo_item")
    private String codigoItem;

    private String observaciones;

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getVentaId() { return ventaId; }
    public void setVentaId(Long ventaId) { this.ventaId = ventaId; }

    public Long getProductoId() { return productoId; }
    public void setProductoId(Long productoId) { this.productoId = productoId; }

    public int getCantidad() { return cantidad; }
    public void setCantidad(int cantidad) { this.cantidad = cantidad; }

    public double getPrecioUnitario() { return precioUnitario; }
    public void setPrecioUnitario(double precioUnitario) { this.precioUnitario = precioUnitario; }

    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }

    public Double getDescuentoItem() { return descuentoItem; }
    public void setDescuentoItem(Double descuentoItem) { this.descuentoItem = descuentoItem; }

    public String getTipoPresentacion() { return tipoPresentacion; }
    public void setTipoPresentacion(String tipoPresentacion) { this.tipoPresentacion = tipoPresentacion; }

    public String getCodigoItem() { return codigoItem; }
    public void setCodigoItem(String codigoItem) { this.codigoItem = codigoItem; }

    public String getObservaciones() { return observaciones; }
    public void setObservaciones(String observaciones) { this.observaciones = observaciones; }
}