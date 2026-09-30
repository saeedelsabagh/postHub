package com.example.demo.Service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.example.demo.DTO.PostDTO;
import com.example.demo.Repository.PostRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import com.example.demo.model.Post;
import com.example.demo.Repository.UserRepository;
import com.example.demo.model.user;
import com.example.demo.exception.UserNotFoundException;
import com.example.demo.exception.PostNotFoundException;
import org.springframework.data.domain.PageRequest;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import com.example.demo.Security.MyUserDetails;
import java.util.ArrayList;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;


@Service
public class PostService {

    private UserRepository userRepository;
    private PostRepository postRepository;
    private FileStorageService fileStorageService;

    public PostService(
            PostRepository postRepository,
            UserRepository userRepository,
            FileStorageService fileStorageService
    ) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
        this.fileStorageService = fileStorageService;
    }


    private PostDTO convertToDTO(Post Post) {
        return new PostDTO(
                Post.getId(),
                Post.getTitle(),
                Post.getBody(),
                Post.getImg(),
                Post.getCommentsCount(),
                Post.getUser().getId()
        );
    }

//    private Post convertToEntity(PostDTO dto) {
//        Post newPost = new Post();
//
//        newPost.setTitle(dto.getTitle());
//        newPost.setBody(dto.getBody());
//        newPost.setImg(dto.getImg());
//        newPost.setCommentsCount(dto.getCommentsCount());
//
//        return newPost;
//    }


    @Transactional
    public PostDTO addPost( String title,
                           String body,
                           Integer commentsCount,
                           MultipartFile image)throws IOException {


        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        MyUserDetails userDetails =
                (MyUserDetails) authentication.getPrincipal();

        Integer currentUserId = userDetails.getId();


        user existingUser = userRepository.findById(currentUserId)
                .orElseThrow(() ->
                        new UserNotFoundException(
                                "User with id " + currentUserId + " not found"
                        ));



        Post newPost = new Post();

        newPost.setTitle(title);
        newPost.setBody(body);
        newPost.setCommentsCount(commentsCount);

        if (image != null && !image.isEmpty()) {
            String imagePath = fileStorageService.saveFile(image);
            newPost.setImg(imagePath);
        }



        newPost.setUser(existingUser);

        Post savedPost = postRepository.save(newPost);

        return convertToDTO(savedPost);
    }

    @PreAuthorize("isAuthenticated()")
    public Page<PostDTO> getPosts(
            int page,
            int size,
            String sortBy,
            String title
    ) {
        page--;

        Pageable pageable = PageRequest.of(
                page,
                size,
                Sort.by(sortBy)
        );

        Page<Post> posts;

        if (title != null && !title.isBlank()) {
            posts = postRepository.findByTitleContaining(title, pageable);
        } else {
            posts = postRepository.findAllWithUser(pageable);
        }

        return posts.map(post -> convertToDTO(post));
    }

    public List<PostDTO> getPostsByUser(Integer userId) {
        List<Post> posts = postRepository.findByUserId(userId);

        List<PostDTO> postsDTO = new ArrayList<>();

        for (Post post : posts) {
            postsDTO.add(convertToDTO(post));
        }

        return postsDTO;
    }

    public PostDTO getPostByPostId(Integer id) {
        Post p = postRepository.findById(id).orElse(null);

        if (p == null) {
            throw new PostNotFoundException(
                    "Post with id " + id + " not found"
            );
        }

        return convertToDTO(p);
    }


    @PreAuthorize("@forPreAuth.isOwner(#id)")
    public String deletePost(Integer id) {

        Post post = postRepository.findById(id)
                .orElseThrow(() ->
                        new PostNotFoundException(
                                "Post with id " + id + " not found"
                        ));

        postRepository.delete(post);

        return "Post deleted successfully";
    }


    @PreAuthorize("@forPreAuth.isOwner(#id)")
    public PostDTO updatePost(Integer id, PostDTO updatePost) {

        Post existingPost = postRepository.findById(id)
                .orElseThrow(() ->
                        new PostNotFoundException(
                                "Post with id " + id + " not found"
                        ));

        existingPost.setTitle(updatePost.getTitle());
        existingPost.setBody(updatePost.getBody());
        existingPost.setImg(updatePost.getImg());
        existingPost.setCommentsCount(updatePost.getCommentsCount());

        Post savedPost = postRepository.save(existingPost);

        return convertToDTO(savedPost);
    }


}
