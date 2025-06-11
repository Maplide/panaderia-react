package com.app.backend.repository;

import com.app.backend.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ClienteRepository extends JpaRepository<Cliente, Integer> {
    Optional<Cliente> findByEmail(String email);
    Optional<Cliente> findByEmailAndPassword(String email, String password);
}
