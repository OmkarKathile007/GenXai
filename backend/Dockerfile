# Stage 1: Build the application using JDK 21
FROM maven:3.9.9-eclipse-temurin-21 AS build
WORKDIR /app
COPY . .
# Skip tests to speed up the build
RUN mvn clean package -DskipTests

# Stage 2: Create the runtime image using JRE 21 (Lightweight)
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
# Copy the jar file
COPY --from=build /app/target/*.jar app.jar

# Expose port 8080
EXPOSE 8080

# Run the app with memory limits for Render Free Tier
ENTRYPOINT ["java", "-Xmx350m", "-jar", "app.jar"]