package com.example.Product_Catalog_Management.security;

import com.example.Product_Catalog_Management.entity.User;
import com.example.Product_Catalog_Management.enums.Role;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.jspecify.annotations.Nullable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.UUID;

@Getter
@RequiredArgsConstructor
public class CustomUserDetails implements UserDetails {
    private final UUID id;
    private final String email;
    private final String password;
    private final Role role;

    public CustomUserDetails(User user) {
        this.id = user.getId();
        this.email = user.getEmail();
        this.password = user.getEncryptedPassword();
        this.role = user.getRole();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(
            new SimpleGrantedAuthority("ROLE_" + role.name())
        );
    }

    @Override
    public @Nullable String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }
}
