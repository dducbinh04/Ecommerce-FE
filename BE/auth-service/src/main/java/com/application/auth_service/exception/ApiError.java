package com.application.auth_service.exception;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ApiError {
    private int status;
    private String message;
    private LocalDateTime timestamp;
}
