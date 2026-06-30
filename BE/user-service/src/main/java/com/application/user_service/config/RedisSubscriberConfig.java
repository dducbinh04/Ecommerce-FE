package com.application.user_service.config;

import com.application.user_service.subscriber.UserSignUpSubscriber;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.data.redis.listener.adapter.MessageListenerAdapter;

@Configuration
public class RedisSubscriberConfig {

    @Bean
    public ChannelTopic userSignUpTopic() {
        return new ChannelTopic("user.signup");
    }

    @Bean
    public MessageListenerAdapter userSignUpListener(UserSignUpSubscriber subscriber) {
        return new MessageListenerAdapter(
            subscriber,
            "handleUserSignUp"
        );
    }

    @Bean
    public RedisMessageListenerContainer redisContainer(
        RedisConnectionFactory connectionFactory,
        MessageListenerAdapter userSignUpListener,
        ChannelTopic userSignUpTopic
    ) {
        RedisMessageListenerContainer container =
            new RedisMessageListenerContainer();

        container.setConnectionFactory(connectionFactory);

        container.addMessageListener(
            userSignUpListener,
            userSignUpTopic
        );

        return container;
    }
}