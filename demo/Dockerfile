FROM eclipse-temurin:17-jdk

WORKDIR /app

COPY . .

RUN chmod +x mvnw && ./mvnw clean package -DskipTests
EXPOSE 8080

CMD ["java", "-Xms64m", "-Xmx192m", "-jar", "target/demo-0.0.1-SNAPSHOT.jar"]
