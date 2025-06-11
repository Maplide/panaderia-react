package com.app.backend.model;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "ingredientes")
public class Ingrediente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private String unidad;

    @Column(name = "stock_actual")
    private Double stockActual;

    @Column(name = "stock_minimo")
    private Double stockMinimo;

    private String proveedor;

    @Column(name = "costo_unitario")
    private Double costoUnitario;

    @Column(name = "fecha_ultimo_ingreso")
    private Date fechaUltimoIngreso;

    @Column(name = "ubicacion_almacen")
    private String ubicacionAlmacen;

    @Column(name = "codigo_barras")
    private String codigoBarras;

    private String estado;

    private String observaciones;

    // Getters y Setters
    // (Puedes generar automáticamente en tu IDE)
}
