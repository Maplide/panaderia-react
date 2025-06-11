package com.app.backend.dto;

import java.util.List;

public class VentaConDetallesDTO {
    private Integer clienteId;
    private String formaEntrega;
    private String tipoPago;
    private Double total;
    private List<DetalleVentaDTO> detalles;
    private String direccion;

    // Getters y Setters

    public Integer getClienteId() {
        return clienteId;
    }

    public void setClienteId(Integer clienteId) {
        this.clienteId = clienteId;
    }

    public String getFormaEntrega() {
        return formaEntrega;
    }

    public void setFormaEntrega(String formaEntrega) {
        this.formaEntrega = formaEntrega;
    }

    public String getTipoPago() {
        return tipoPago;
    }

    public void setTipoPago(String tipoPago) {
        this.tipoPago = tipoPago;
    }

    public Double getTotal() {
        return total;
    }

    public void setTotal(Double total) {
        this.total = total;
    }

    public List<DetalleVentaDTO> getDetalles() {
        return detalles;
    }

    public void setDetalles(List<DetalleVentaDTO> detalles) {
        this.detalles = detalles;
    }

    // Getter
    public String getDireccion() {
        return direccion;
    }

    // Setter
    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }
}
