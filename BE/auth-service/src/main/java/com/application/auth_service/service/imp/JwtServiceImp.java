package com.application.auth_service.service.imp;

import com.application.auth_service.config.JwtProperties;
import com.application.auth_service.enums.Role;
import com.application.auth_service.payload.TokenPayload;
import com.application.auth_service.service.JwtService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.function.Function;

@Service
@RequiredArgsConstructor
public class JwtServiceImp implements JwtService {

    private final JwtProperties jwtProperties;

    @Override
    public String generateAccessToken(TokenPayload payload) {
        Map<String, Object> extraClaims = new HashMap<>();
        extraClaims.put("sub", payload.getSub().toString());
        extraClaims.put("role", payload.getRole());
        extraClaims.put("type", payload.getType());
        return buildToken(extraClaims, payload.getSub(), jwtProperties.getExpiration());
    }

    @Override
    public String generateRefreshToken(TokenPayload payload) {
        var refreshTll = jwtProperties.getRefreshTtl();
        Map<String, Object> extraClaims = new HashMap<>();
        extraClaims.put("sub", payload.getSub().toString());
        extraClaims.put("role", payload.getRole());
        extraClaims.put("type", payload.getType());
        extraClaims.put("ttl", refreshTll);
        return buildToken(extraClaims, payload.getSub(), refreshTll);
    }

    @Override
    public String extractUserId(String token) {
        final Claims claims = extractAllClaims(token);
        return claims.getSubject();
    }

    @Override
    public Role extractRole(String token) {
        Object role = extractAllClaims(token).get("role");

        if (role instanceof String roleStr) {
            return Role.valueOf(roleStr);
        }

        return null;
    }

    @Override
    public Date extractExpr(String token) {
        final Claims claims = extractAllClaims(token);
        return claims.getExpiration();
    }

    @Override
    public String extractJti(String token) {
        return extractAllClaims(token).getId();
    }


    private <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    @Override
    public boolean isTokenValid(String token) {
        try {
            return !extractClaim(token, Claims::getExpiration).before(new Date());
        }
        catch (JwtException e) {
            return false;
        }
    }

    private String buildToken(Map<String, Object> extraClaims, Object subject, long expiration) {
        return Jwts
            .builder()
            .claims(extraClaims)
            .id(UUID.randomUUID().toString())
            .subject(subject.toString())
            .issuedAt(new Date(System.currentTimeMillis()))
            .expiration(new Date(System.currentTimeMillis() + expiration))
            .signWith(getSignInKey())
            .compact();
    }

    private Claims extractAllClaims(String token) {
        return Jwts
            .parser()
            .verifyWith(getSignInKey())
            .build()
            .parseSignedClaims(token)
            .getPayload();
    }

    private SecretKey getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(jwtProperties.getSecretKey());
        return Keys.hmacShaKeyFor(keyBytes);
    }

}
