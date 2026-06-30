package com.application.product.client;

import com.application.product.dto.request.GetUsersRequest;
import com.application.product.dto.response.UserDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.UUID;

@FeignClient(name = "user-client", url = "http://user-service:8082")
public interface UserClient {
    @GetMapping(value = "/api/v1/users/{userId}")
    UserDto getUser(@PathVariable("userId") UUID userId);

    @PostMapping(value = "/api/v1/users/profiles")
    List<UserDto> getUsers(@RequestBody GetUsersRequest request);


}
