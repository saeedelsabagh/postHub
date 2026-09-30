package com.example.demo.Repository;
import java.util.Optional;
import com.example.demo.model.user;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<user, Integer> {
    Optional<user> findByEmail(String email);
}