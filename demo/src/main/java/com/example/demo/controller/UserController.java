package com.example.demo.controller;

import com.example.demo.DTO.RegisterUserDTO;
import com.example.demo.Service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import com.example.demo.DTO.UserDTO;
import jakarta.validation.Valid;
import com.example.demo.DTO.UpdateUserDTO;
import com.example.demo.DTO.UpdateUserDTO;

@RestController
public class UserController {

    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }


    @PostMapping("/users")
    public UserDTO addUser(@Valid @RequestBody RegisterUserDTO dto) {
        return userService.addUser(dto);
    }

    @GetMapping("/userss")
    public List<UserDTO> getUsers() {
        return userService.getUsers();
    }

    @GetMapping("/userss/{id}")
    public UserDTO getUserById(@PathVariable int id) {
        return userService.getUserById(id);
    }

    @DeleteMapping("/userss/{id}")
    public String deleteUser(@PathVariable int id) {
        return userService.deleteUser(id);

    }

    @PutMapping("/userss/{id}")
    public UserDTO updateUser(@PathVariable int id, @Valid @RequestBody UpdateUserDTO updateUserdto) {
        return userService.updateUser(id, updateUserdto);

    }
}