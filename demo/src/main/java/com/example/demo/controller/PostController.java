package com.example.demo.controller;

import com.example.demo.DTO.PostDTO;
import com.example.demo.Service.PostService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;

import java.util.List;
import java.io.IOException;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class PostController {

    private PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @PostMapping("/posts")
    public PostDTO addPost(
            @RequestParam(required = false) Integer commentsCount,
            @RequestParam String title,
            @RequestParam String body,
            @RequestParam MultipartFile image

    ) throws IOException  {
        return postService.addPost( title,
                body,
                commentsCount,
                image);
    }

    @GetMapping("/posts")
    public Page<PostDTO> getPosts(
            @RequestParam int page,
            @RequestParam int size,
            @RequestParam String sortBy,
            @RequestParam(required = false) String title
    ) {
        return postService.getPosts(page, size, sortBy, title);
    }

    @GetMapping("/users/{userId}/posts")
    public List<PostDTO> getPostsByUser(@PathVariable Integer userId) {
        return postService.getPostsByUser(userId);
    }

    @GetMapping("post/{postId}")
    public PostDTO getPostsByPostId(@PathVariable Integer postId) {
        return postService.getPostByPostId(postId);
    }

    @DeleteMapping("post/{postId}")
    public String deletePost(@PathVariable Integer postId) {
        return postService.deletePost(postId);
    }

    @PutMapping("/updatePost/{id}")
    public PostDTO updatePost(@PathVariable Integer id, @Valid @RequestBody PostDTO updatePost) {
        return postService.updatePost(id, updatePost);

    }


}