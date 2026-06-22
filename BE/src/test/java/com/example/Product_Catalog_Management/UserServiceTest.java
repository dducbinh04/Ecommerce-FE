package com.example.Product_Catalog_Management;

import com.example.Product_Catalog_Management.entity.User;
import com.example.Product_Catalog_Management.enums.Gender;
import com.example.Product_Catalog_Management.enums.Role;
import com.example.Product_Catalog_Management.repository.UserRepository;
import com.example.Product_Catalog_Management.service.UserService;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.RequiredArgsConstructor;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.Optional;
import java.util.UUID;

import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@RequiredArgsConstructor(onConstructor_ = {@Autowired})
class UserServiceTest {

    @Mock
    private final UserRepository userRepository;

    @InjectMocks
    private final UserService userService;

    @Test
    void testFindUserById() {
        // 1. Giả lập dữ liệu
        UUID userID = UUID.fromString("009212be-fafc-40fd-b4fb-a1a46e9aae52");
        User mockUser = new User();
        mockUser.setId(userID);
        mockUser.setEmail("tienloc0902@gmail.com");
        when(userRepository.findById(userID)).thenReturn(Optional.of(mockUser));

        // 2. Gọi hàm cần test
        User result = userService.getUserById(userID);

        // 3. Kiểm tra kết quả
        Assertions.assertEquals("Nguyen Van A", result.getFullName());
        verify(userRepository, times(1)).findById(userID);
    }
}