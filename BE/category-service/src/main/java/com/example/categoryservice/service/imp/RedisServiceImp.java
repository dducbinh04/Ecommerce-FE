package com.example.categoryservice.service.imp;

import com.example.categoryservice.service.RedisService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import tools.jackson.databind.ObjectMapper;

import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class RedisServiceImp implements RedisService {

    private final RedisTemplate<String, String> redisTemplate;
    private final ObjectMapper objectMapper;

    @Override
    public <T> void set(String key, T value, long ttl) {
        try {
            redisTemplate.opsForValue()
                .set(key, objectMapper.writeValueAsString(value),
                    ttl, TimeUnit.SECONDS);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public <T> T get(String key, Class<T> clazz) {
        try {
            String json = redisTemplate.opsForValue().get(key);
            return json == null ? null : objectMapper.readValue(json, clazz);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void delete(String key) {
        redisTemplate.delete(key);
    }

    @Override
    public void expire(String key, long ttl) {
        redisTemplate.expire(key, ttl, TimeUnit.SECONDS);
    }

    @Override
    public boolean exists(String key) {
        return redisTemplate.hasKey(key);
    }
}
