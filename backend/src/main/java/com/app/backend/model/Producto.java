package com.app.backend.model;

import jakarta.persistence.*;
import com.app.backend.model.Categoria;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "productos")
public class Producto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private String descripcion;
    private double precio;
    private int stock;

    @Column(name = "imagen_url")
    private String imagenUrl;

    private double peso;

    @Column(name = "tiempo_preparacion")
    private int tiempoPreparacion;

    private String estado;

    @Column(name = "codigo_producto")
    private String codigoProducto;

    @Column(name = "fecha_creacion", insertable = false, updatable = false,
            columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private String fechaCreacion;

    @JsonIgnoreProperties("categoria")
    @ManyToOne
    @JoinColumn(name = "categoria_id")
    private Categoria categoria;

    // Getters y Setters

    // Getters y Setters

public Long getId() { return id; }
public void setId(Long id) { this.id = id; }

public String getNombre() { return nombre; }
public void setNombre(String nombre) { this.nombre = nombre; }

public String getDescripcion() { return descripcion; }
public void setDescripcion(String descripcion) { this.descripcion = descripcion; }

public double getPrecio() { return precio; }
public void setPrecio(double precio) { this.precio = precio; }

public int getStock() { return stock; }
public void setStock(int stock) { this.stock = stock; }

public String getImagenUrl() { return imagenUrl; }
public void setImagenUrl(String imagenUrl) { this.imagenUrl = imagenUrl; }

public double getPeso() { return peso; }
public void setPeso(double peso) { this.peso = peso; }

public int getTiempoPreparacion() { return tiempoPreparacion; }
public void setTiempoPreparacion(int tiempoPreparacion) { this.tiempoPreparacion = tiempoPreparacion; }

public String getEstado() { return estado; }
public void setEstado(String estado) { this.estado = estado; }

public String getCodigoProducto() { return codigoProducto; }
public void setCodigoProducto(String codigoProducto) { this.codigoProducto = codigoProducto; }

public String getFechaCreacion() { return fechaCreacion; }
public void setFechaCreacion(String fechaCreacion) { this.fechaCreacion = fechaCreacion; }

public Categoria getCategoria() {
    return categoria;
}

public void setCategoria(Categoria categoria) {
    this.categoria = categoria;
}

}
