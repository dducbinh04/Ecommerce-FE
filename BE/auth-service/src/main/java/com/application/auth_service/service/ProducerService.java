package com.application.auth_service.service;

public interface ProducerService {
    void publish(String channel, Object data);
}
