package com.app.backend.model;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "ventas")
public class Venta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "cliente_id")
    private Long clienteId;

    @Temporal(TemporalType.TIMESTAMP)
    private Date fecha;

    private Double total;

    @Column(name = "tipo_pago")
    private String tipoPago;

    @Column(name = "numero_comprobante")
    private String numeroComprobante;

    private Double igv;
    private Double descuento;
    private String estado;
    private String observaciones;

    @Column(name = "empleado_id")
    private Long empleadoId;

    @Column(name = "forma_entrega")
    private String formaEntrega;

    @Column(columnDefinition = "TEXT")
    private String direccionEntrega;

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getClienteId() { return clienteId; }
    public void setClienteId(Long clienteId) { this.clienteId = clienteId; }

    public Date getFecha() { return fecha; }
    public void setFecha(Date fecha) { this.fecha = fecha; }

    public Double getTotal() { return total; }
    public void setTotal(Double total) { this.total = total; }

    public String getTipoPago() { return tipoPago; }
    public void setTipoPago(String tipoPago) { this.tipoPago = tipoPago; }

    public String getNumeroComprobante() { return numeroComprobante; }
    public void setNumeroComprobante(String numeroComprobante) { this.numeroComprobante = numeroComprobante; }

    public Double getIgv() { return igv; }
    public void setIgv(Double igv) { this.igv = igv; }

    public Double getDescuento() { return descuento; }
    public void setDescuento(Double descuento) { this.descuento = descuento; }

    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }

    public String getObservaciones() { return observaciones; }
    public void setObservaciones(String observaciones) { this.observaciones = observaciones; }

    public Long getEmpleadoId() { return empleadoId; }
    public void setEmpleadoId(Long empleadoId) { this.empleadoId = empleadoId; }

    public String getFormaEntrega() { return formaEntrega; }
    public void setFormaEntrega(String formaEntrega) { this.formaEntrega = formaEntrega; }

    // Getter
    public String getDireccionEntrega() {
        return direccionEntrega;
    }

    // Setter
    public void setDireccionEntrega(String direccionEntrega) {
        this.direccionEntrega = direccionEntrega;
    }
}