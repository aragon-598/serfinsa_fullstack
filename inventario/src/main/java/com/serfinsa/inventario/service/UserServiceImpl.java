package com.serfinsa.inventario.service;

import com.serfinsa.inventario.model.User;
import com.serfinsa.inventario.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private com.serfinsa.inventario.repository.RolRepository rolRepository;

    @Override
    public User saveUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        // Si el usuario tiene rol por nombre, buscar y asignar el objeto Rol
        if (user.getRol() != null && user.getRol().getNombre() != null) {
            var rol = rolRepository.findByNombre(user.getRol().getNombre());
            user.setRol(rol);
        }
        return userRepository.save(user);
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}