package com.serfinsa.inventario.controller;

import com.serfinsa.inventario.model.TipoProducto;
import com.serfinsa.inventario.service.TipoProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tipo-productos")
public class TipoProductoController {
    @Autowired
    private TipoProductoService tipoProductoService;

    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @GetMapping
    public List<TipoProducto> getAll() {
        return tipoProductoService.getAll();
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @GetMapping("/{id}")
    public ResponseEntity<TipoProducto> getById(@PathVariable Long id) {
        Optional<TipoProducto> tipo = tipoProductoService.getById(id);
        return tipo.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public TipoProducto create(@RequestBody TipoProducto tipoProducto) {
        return tipoProductoService.save(tipoProducto);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<TipoProducto> update(@PathVariable Long id, @RequestBody TipoProducto tipoProducto) {
        Optional<TipoProducto> existing = tipoProductoService.getById(id);
        if (existing.isPresent()) {
            tipoProducto.setId(id);
            return ResponseEntity.ok(tipoProductoService.save(tipoProducto));
        }
        return ResponseEntity.notFound().build();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        tipoProductoService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
