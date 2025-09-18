
package com.serfinsa.inventario.service;

import com.serfinsa.inventario.model.User;
import java.util.Optional;

public interface UserService {
    User saveUser(User user);
    Optional<User> findByEmail(String email);
}
