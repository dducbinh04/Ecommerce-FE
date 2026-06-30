package com.application.auth_service.listener;

import com.application.auth_service.payload.event.UserSignUpMessage;
import com.application.auth_service.service.ProducerService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

@Component
@RequiredArgsConstructor
public class UserEventListener {

    private final ProducerService producerService;

    @Async
    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void handleUserSignUp(UserSignUpMessage msg) {
        producerService.publish("user.signup", msg);
    }
}
