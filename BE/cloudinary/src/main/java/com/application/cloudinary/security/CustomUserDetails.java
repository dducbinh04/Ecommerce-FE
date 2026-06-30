package com.application.cloudinary.security;

import com.application.cloudinary.enums.Role;
import org.jspecify.annotations.NonNull;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.UUID;

public record CustomUserDetails(UUID id, Role role) implements UserDetails {
    @Override
    public @NonNull Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(
            new SimpleGrantedAuthority("ROLE_" + role.name())
        );
    }

    @Override
    public @NonNull String getPassword() {
        return "";
    }

    @Override
    public @NonNull String getUsername() {
        return "";
    }
}
