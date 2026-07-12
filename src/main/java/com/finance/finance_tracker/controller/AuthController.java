package com.finance.finance_tracker.controller;

import com.finance.finance_tracker.dto.RegisterRequest;
import com.finance.finance_tracker.entity.User;
import com.finance.finance_tracker.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.finance.finance_tracker.dto.LoginRequest;
import com.finance.finance_tracker.dto.LoginResponse;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody RegisterRequest request) {

        User user = userService.registerUser(request);

        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {

        return ResponseEntity.ok(userService.login(request));
    }

    @GetMapping("/me")
    public String currentUser(Authentication authentication) {
        return "Welcome " + authentication.getName();
    }
}
