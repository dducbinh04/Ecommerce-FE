package com.application.product.service.Imp;

import com.application.product.config.JwtProperties;
import com.application.product.enums.Role;
import com.application.product.service.JwtService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.function.Function;

@Service
@RequiredArgsConstructor
public class JwtServiceImp implements JwtService {

    private final JwtProperties jwtProperties;

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
