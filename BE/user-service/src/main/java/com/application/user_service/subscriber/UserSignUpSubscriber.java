package com.application.user_service.subscriber;

import com.application.user_service.payload.UserSignUpMessage;
import com.application.user_service.service.ProfileService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import tools.jackson.databind.ObjectMapper;

@Slf4j
@Component
@RequiredArgsConstructor
public class UserSignUpSubscriber {

    private final ProfileService profileService;
    private final ObjectMapper objectMapper;

    public void handleUserSignUp(String message) {
        log.info("Receive message from user-signup: {}", message);

        try {
            UserSignUpMessage msg = objectMapper.readValue(message, UserSignUpMessage.class);
            profileService.createProfile(msg);
        }
        catch (Exception e) {
            log.error("Failed to process user.signup message", e);
        }
    }
}
