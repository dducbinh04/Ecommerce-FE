# Stage 1: Install dependencies
FROM maven:3.9.9-eclipse-temurin-21 AS builder
WORKDIR /app

COPY pom.xml .
RUN mvn dependency:go-offline

# Stage 2: Build code
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 3: Containerize light image (Final stage)
FROM eclipse-temurin:21-jdk
WORKDIR /app

COPY --from=builder /app/target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]