package com.example.demo.Repository;

import com.example.demo.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.EntityGraph;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PostRepository extends JpaRepository<Post, Integer> {
    List<Post> findByUserId(Integer userId);

    @EntityGraph(attributePaths = "user")
    @Query("SELECT p FROM Post p")
    Page<Post> findAllWithUser(Pageable pageable);

    @EntityGraph(attributePaths = "user")
    Page<Post> findByTitleContaining(String title, Pageable pageable);
}
