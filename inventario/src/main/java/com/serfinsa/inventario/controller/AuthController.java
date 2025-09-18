package com.serfinsa.inventario.controller;

import com.serfinsa.inventario.dto.LoginRequest;
import com.serfinsa.inventario.dto.LoginResponse;
import com.serfinsa.inventario.model.User;
import com.serfinsa.inventario.service.UserService;
import com.serfinsa.inventario.config.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private UserService userService;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        Optional<User> userOpt = userService.findByEmail(loginRequest.getEmail());
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
                String rolNombre = user.getRol() != null ? user.getRol().getNombre() : null;
                String token = jwtUtil.generateToken(user.getEmail(), rolNombre);
                return ResponseEntity.ok(new LoginResponse(token, rolNombre));
            }
        }
        return ResponseEntity.status(401).body("Credenciales inválidas");
    }
}
