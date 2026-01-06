# ===============================
# Stage 1: Build (Maven + Java 21)
# ===============================
FROM maven:3.9-eclipse-temurin-21 AS build

WORKDIR /app

# Cache dependencies
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy source and build
COPY src ./src
RUN mvn clean package -DskipTests

# ===============================
# Stage 2: Runtime (Lightweight JRE)
# ===============================
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Copy jar from build stage
COPY --from=build /app/target/*.jar app.jar

# Expose application port
EXPOSE 8080

# Run with container-friendly JVM flags
ENTRYPOINT ["java", \
  "-XX:+UseContainerSupport", \
  "-XX:MaxRAMPercentage=75.0", \
  "-jar", \
  "app.jar"]
