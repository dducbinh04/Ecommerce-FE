package com.application.auth_service.service.imp;

import com.application.auth_service.service.ProducerService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProducerServiceImp implements ProducerService {

    private final RedisTemplate<String, Object> redisTemplate;

    @Override
    public void publish(String channel, Object data) {
        redisTemplate.convertAndSend(channel, data);
    }
}
