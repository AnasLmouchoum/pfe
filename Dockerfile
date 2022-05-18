# syntax=docker/dockerfile:1

FROM innovds/maven-ids:j15-m3.8.4
WORKDIR /app

COPY .mvn/ .mvn
COPY mvnw pom.xml ./
RUN chmod +x mvnw
RUN ./mvnw dependency:go-offline

COPY src/ src

CMD ["./mvnw", "spring-boot:run"]
