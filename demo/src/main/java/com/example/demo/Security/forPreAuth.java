package com.example.demo.Security;

import com.example.demo.Repository.PostRepository;
import com.example.demo.model.Post;
import com.example.demo.exception.PostNotFoundException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component("forPreAuth")
public class forPreAuth {

    private final PostRepository postRepository;

    public forPreAuth(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    public boolean isOwner(Integer postId) {

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        MyUserDetails userDetails =
                (MyUserDetails) authentication.getPrincipal();

        Integer currentUserId = userDetails.getId();

        Post post = postRepository.findById(postId)
                .orElseThrow(() ->
                        new PostNotFoundException(
                                "Post with id " + postId + " not found"
                        ));

        return post.getUser().getId().equals(currentUserId);
    }

    public boolean isCurrentUser(Integer userId) {

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        MyUserDetails userDetails =
                (MyUserDetails) authentication.getPrincipal();

        return userDetails.getId().equals(userId);
    }
}




