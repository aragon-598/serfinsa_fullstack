package com.serfinsa.inventario.repository;

import com.serfinsa.inventario.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
