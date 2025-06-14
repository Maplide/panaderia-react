package com.app.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "categorias")
@Getter
@Setter
public class Categoria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;

    @Column(columnDefinition = "TEXT")
    private String descripcion;

    @Enumerated(EnumType.STRING)
    private TipoCategoria tipo;

    @Column(name = "fecha_creacion", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime fechaCreacion;

    @Column(name = "imagen_url")
    private String imagenUrl;

    private int popularidad;

    private boolean destacado;

    @Enumerated(EnumType.STRING)
    private Estado estado;

    @Column(name = "codigo_categoria")
    private String codigoCategoria;

    private Integer orden;

    @Column(columnDefinition = "TEXT")
    private String observaciones;

    public enum TipoCategoria {
        pan, torta, galleta, queque, postre, pastel
    }

    public enum Estado {
        activo, inactivo
    }
}
