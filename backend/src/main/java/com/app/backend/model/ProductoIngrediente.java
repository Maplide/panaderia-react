package com.app.backend.model;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "productos_ingredientes")
public class ProductoIngrediente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "producto_id")
    private Long productoId;

    @Column(name = "ingrediente_id")
    private Long ingredienteId;

    private Double cantidad;
    private String unidad;

    @Column(name = "orden_preparacion")
    private Integer ordenPreparacion;

    @Column(name = "tipo_uso")
    private String tipoUso;

    @Column(name = "tiempo_aplicacion")
    private Integer tiempoAplicacion;

    @Column(name = "es_opcional")
    private Boolean esOpcional;

    private String observaciones;

    @Column(name = "creado_por")
    private String creadoPor;

    @Column(name = "fecha_registro", insertable = false, updatable = false,
            columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Date fechaRegistro;

    // Getters y Setters
}
