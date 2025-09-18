package com.serfinsa.inventario.service;

import com.serfinsa.inventario.model.TipoProducto;
import com.serfinsa.inventario.repository.TipoProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TipoProductoServiceImpl implements TipoProductoService {
    @Autowired
    private TipoProductoRepository tipoProductoRepository;

    @Override
    public List<TipoProducto> getAll() {
        return tipoProductoRepository.findAll();
    }

    @Override
    public Optional<TipoProducto> getById(Long id) {
        return tipoProductoRepository.findById(id);
    }

    @Override
    public TipoProducto save(TipoProducto tipoProducto) {
        return tipoProductoRepository.save(tipoProducto);
    }

    @Override
    public void delete(Long id) {
        tipoProductoRepository.deleteById(id);
    }
}