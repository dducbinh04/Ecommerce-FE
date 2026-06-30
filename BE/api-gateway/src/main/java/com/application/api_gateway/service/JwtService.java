package com.application.api_gateway.service;



import com.application.api_gateway.enums.Role;

import java.util.Date;

public interface JwtService {
    String extractUserId(String token);
    String extractJti(String token);
    Date extractExpr(String token);
    Role extractRole(String token);
    boolean isTokenValid(String token);
}
