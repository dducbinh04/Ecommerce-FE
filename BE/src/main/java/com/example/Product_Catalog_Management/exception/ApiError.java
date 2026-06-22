package com.example.Product_Catalog_Management.exception;

import lombok.*;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ApiError {
    private int status;
    private String message;
    private LocalDateTime timestamp;
}
