package com.example.Product_Catalog_Management.config;

import com.example.Product_Catalog_Management.repository.UserRepository;
import com.example.Product_Catalog_Management.security.CustomUserDetails;
import com.example.Product_Catalog_Management.security.JwtAccessDeniedHandler;
import com.example.Product_Catalog_Management.security.JwtAuthenticationEntryPoint;
import com.example.Product_Catalog_Management.security.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

import static com.example.Product_Catalog_Management.constant.ApiPath.*;
import static com.example.Product_Catalog_Management.enums.Role.ADMIN;

@Slf4j
@RequiredArgsConstructor
@EnableWebSecurity
@EnableMethodSecurity
@Configuration
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthFilter;
    private final UserRepository userRepository;
    private final JwtAuthenticationEntryPoint authenticationEntryPoint;
    private final JwtAccessDeniedHandler accessDeniedHandler;
    private final CorsProperties corsProperties;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .cors(Customizer.withDefaults())

                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HOME).permitAll()
                        .requestMatchers(ACTUATOR_HEALTH, ACTUATOR_INFO).permitAll()
                        .requestMatchers(ACTUATOR).hasRole(ADMIN.name())
                        .requestMatchers(SWAGGER, API_DOC).permitAll()
                        .requestMatchers(AUTH_SIGN_UP, AUTH_SIGN_IN, AUTH_AUTO_SIGN_IN).permitAll()
                        .requestMatchers(HttpMethod.GET, PRODUCTS, PRODUCTS_ID, PRODUCTS_SEARCH).permitAll()
                        .requestMatchers(HttpMethod.GET, CATEGORIES_ID, CATEGORIES).permitAll()
                        .anyRequest().authenticated()
                )

                .exceptionHandling(ex -> ex
                        .authenticationEntryPoint(authenticationEntryPoint)
                        .accessDeniedHandler(accessDeniedHandler)
                )

                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )

                .authenticationProvider(authenticationProvider())
                .addFilterBefore(
                        jwtAuthFilter,
                        UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        return request -> {
            CorsConfiguration config = new CorsConfiguration();

            config.setAllowedOrigins(
                    Arrays.stream(corsProperties.getAllowedOrigins().split(","))
                            .map(String::trim)
                            .toList()
            );

            config.setAllowedMethods(
                    Arrays.stream(corsProperties.getAllowedMethods().split(","))
                            .map(String::trim)
                            .toList()
            );

            config.setAllowedHeaders(
                    Arrays.stream(corsProperties.getAllowedHeaders().split(","))
                            .map(String::trim)
                            .toList()
            );

            config.setAllowCredentials(true);

            config.setExposedHeaders(List.of("Authorization"));

            return config;
        };
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public UserDetailsService userDetailsService() {
        return email -> userRepository.findByEmail(email)
                .map(CustomUserDetails::new)
                .orElseThrow(() ->
                        new UsernameNotFoundException(email));
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider =
                new DaoAuthenticationProvider(userDetailsService());

        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

}