package com.excursionhub.capstone.data;

import com.excursionhub.capstone.models.User;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface UserRepository extends CrudRepository<User, Integer> {
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
    User findByResetToken(String resetToken);
}
