
package com.serfinsa.inventario.service;

import com.serfinsa.inventario.model.TipoProducto;
import java.util.List;
import java.util.Optional;

public interface TipoProductoService {
    List<TipoProducto> getAll();
    Optional<TipoProducto> getById(Long id);
    TipoProducto save(TipoProducto tipoProducto);
    void delete(Long id);
}
