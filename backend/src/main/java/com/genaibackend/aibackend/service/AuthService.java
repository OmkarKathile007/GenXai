package com.genaibackend.aibackend.service;


import com.genaibackend.aibackend.dto.AuthResponse;
import com.genaibackend.aibackend.dto.LoginRequest;
import com.genaibackend.aibackend.dto.RegisterRequest;
import com.genaibackend.aibackend.model.Role;
import com.genaibackend.aibackend.model.User;
import com.genaibackend.aibackend.repository.UserRepository;
import com.genaibackend.aibackend.security.JwtUtil;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;

    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       JwtUtil jwtUtil,
                       AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.authenticationManager = authenticationManager;
    }

    public AuthResponse register(RegisterRequest request) {
        // Validation: Check if user exists
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username already exists");
        }

        // Map Roles (String -> Enum)
        Set<Role> roles = new HashSet<>();
        if (request.getRoles() != null) {
            for (String role : request.getRoles()) {
                try {
                    roles.add(Role.valueOf(role.toUpperCase()));
                } catch (IllegalArgumentException e) {
                    // Ignore invalid roles or set default
                    roles.add(Role.USER);
                }
            }
        } else {
            roles.add(Role.USER); // Default role
        }

        //  Create User Object
        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword())); // HASH IT!
        user.setRoles(roles);

        //  Save to DB
        userRepository.save(user);

        // Generate Token immediately (so they don't have to login after register)
        String token = jwtUtil.generateToken(new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                new HashSet<>() // Roles not needed for token generation in this simple example
        ));

        return new AuthResponse(token);
    }

    public AuthResponse login(LoginRequest request) {
        //  Authenticate using Spring Security Manager
        // This will verify the username and password automatically
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );

        //  If we get here, credentials are correct. Generate Token.
        // We need to fetch the UserDetails again to get the Roles for the token
        User user = userRepository.findByUsername(request.getUsername()).orElseThrow();

        // Convert to Spring UserDetails (minimal version for token)
        // In a real app, you might refactor this conversion to a shared utility method
        String token = jwtUtil.generateToken(new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                new HashSet<>()
        ));

        return new AuthResponse(token);
    }
}

