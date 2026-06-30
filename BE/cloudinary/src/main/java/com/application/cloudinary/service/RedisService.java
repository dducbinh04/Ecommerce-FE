package com.application.cloudinary.service;

public interface RedisService {
    <T> void set(String key, T value, long ttl);
    <T> T get(String key, Class<T> clazz);
    void delete(String key);
    void expire(String key, long ttl);
    boolean exists(String key);
}
