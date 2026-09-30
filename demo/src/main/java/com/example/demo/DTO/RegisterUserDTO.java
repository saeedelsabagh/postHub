package com.example.demo.DTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class RegisterUserDTO {

    @NotBlank(message = "Name cannot be empty")
    @Size(
            min = 3,
            max = 20,
            message = "Name must be between 3 and 20 characters"
    )
    private String name;

    @NotNull(message = "Age cannot be null")
    @Min(value = 1, message = "Age must be between 1 and 100")
    @Max(value = 100, message = "Age must be between 1 and 100")
    private Integer age;

    @NotBlank(message = "Email cannot be empty")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Password cannot be empty")
    @Size(
            min = 6,
            message = "Password must be at least 6 characters"
    )
    private String password;


    public RegisterUserDTO() {
    }


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }


    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }


    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}