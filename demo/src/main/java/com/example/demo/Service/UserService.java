package com.example.demo.Service;

import com.example.demo.DTO.RegisterUserDTO;
import com.example.demo.DTO.UpdateUserDTO;
import com.example.demo.model.user;
import org.springframework.stereotype.Service;
import com.example.demo.Repository.UserRepository;
import com.example.demo.DTO.UserDTO;

import java.util.List;
import java.util.ArrayList;

import com.example.demo.exception.UserNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.access.prepost.PreAuthorize;


@Service
public class UserService {

    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;

    public UserService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    private user convertRegisterToEntity(RegisterUserDTO dto) {

        user newUser = new user();

        newUser.setName(dto.getName());
        newUser.setAge(dto.getAge());
        newUser.setEmail(dto.getEmail());
        newUser.setPassword(dto.getPassword());

        return newUser;
    }
    private UserDTO convertToDTO(user user) {

        return new UserDTO(
                user.getId(),
                user.getName(),
                user.getAge(),
                user.getEmail()
        );
    }

    public UserDTO addUser(RegisterUserDTO dto) {

        user newUser = convertRegisterToEntity(dto);

        newUser.setRole("USER");

        newUser.setPassword(
                passwordEncoder.encode(newUser.getPassword())
        );

        user savedUser = userRepository.save(newUser);

        return convertToDTO(savedUser);
    }

    public List<UserDTO> getUsers() {

        List<user> users = userRepository.findAll();

        List<UserDTO> usersDTO = new ArrayList<>();

        for (user u : users) {
            usersDTO.add(convertToDTO(u));
        }

        return usersDTO;
    }


    public UserDTO getUserById(int id) {
        user existingUser = userRepository.findById(id)
                .orElseThrow(() ->
                        new UserNotFoundException("User with id " + id + " not found"));


        return convertToDTO(existingUser);
    }


    @PreAuthorize("hasRole('ADMIN')")
    public String deleteUser(int id) {

        user existingUser = userRepository.findById(id)
                .orElseThrow(() ->
                        new UserNotFoundException(
                                "User with id " + id + " not found"
                        ));

        userRepository.delete(existingUser);

        return "User deleted successfully";
    }


    @PreAuthorize("@forPreAuth.isCurrentUser(#id)")
    public UserDTO updateUser(int id, UpdateUserDTO  updateUserdto) {

        user existingUser = userRepository.findById(id).orElse(null);

        if (existingUser == null) {
            return null;
        }

        existingUser.setName(updateUserdto.getName());
        existingUser.setAge(updateUserdto.getAge());

        user savedUser = userRepository.save(existingUser);

        return convertToDTO(savedUser);
    }
}
