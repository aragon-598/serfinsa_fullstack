package com.serfinsa.inventario.repository;

import com.serfinsa.inventario.model.TipoProducto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TipoProductoRepository extends JpaRepository<TipoProducto, Long> {
}
