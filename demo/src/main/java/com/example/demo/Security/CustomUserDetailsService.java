package com.example.demo.Security;

import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import com.example.demo.Repository.UserRepository;
import java.util.List;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import com.example.demo.model.user;
import org.springframework.stereotype.Service;


@Service
public class CustomUserDetailsService implements UserDetailsService {

    private UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        user existingUser = userRepository.findByEmail(username)
                .orElseThrow(() ->
                        new UsernameNotFoundException(
                                "User with email " + username + " not found"
                        ));

        List<GrantedAuthority> authorities = List.of(
                new SimpleGrantedAuthority(
                        "ROLE_" + existingUser.getRole()
                )
        );

        return new MyUserDetails(
                existingUser.getId(),
                existingUser.getEmail(),
                existingUser.getPassword(),
                authorities
        );
    }
}
