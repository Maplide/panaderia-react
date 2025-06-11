package com.app.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "empleados")
public class Empleado {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private String apellido;
    private String usuario;
    private String password;

    @Enumerated(EnumType.STRING)
    private Rol rol;

    private String email;
    private String telefono;
    private String direccion;

    @Column(name = "fecha_ingreso")
    private String fechaIngreso;

    private String estado;
    private String observaciones;

    // Enum interno para el rol
    public enum Rol {
        admin, vendedor, repostero
    }

    // Getters y Setters
}
