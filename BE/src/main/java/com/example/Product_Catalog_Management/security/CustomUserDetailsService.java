package com.example.Product_Catalog_Management.security;

import com.example.Product_Catalog_Management.entity.User;
import com.example.Product_Catalog_Management.exception.ResourceNotFoundException;
import com.example.Product_Catalog_Management.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public UserDetails loadUserById(String userId) {
        User user = userRepository.findById(UUID.fromString(userId))
            .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        return new CustomUserDetails(user);
    }

    @Override
    public UserDetails loadUserByUsername(String email)
        throws UsernameNotFoundException {

        User user = userRepository.findByEmail(email)
            .orElseThrow(() ->
                new UsernameNotFoundException(email));

        return new CustomUserDetails(
            user.getId(),
            user.getEmail(),
            user.getEncryptedPassword(),
            user.getRole()
        );
    }
}
