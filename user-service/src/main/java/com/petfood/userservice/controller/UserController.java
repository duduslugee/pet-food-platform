package com.petfood.userservice.controller;

import com.petfood.userservice.model.User;
import com.petfood.userservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserRepository repository;

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return repository.save(user);
    }

    @PostMapping("/login")
    public User login(@RequestBody User user) {
        User existingUser = repository.findByEmail(user.getEmail());
        if (existingUser != null && existingUser.getPassword().equals(user.getPassword())) {
            return existingUser;
        }
        throw new RuntimeException("Invalid credentials");
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable String id) {
        return repository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
    }
}