package com.tubeshadow;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Testcontainers;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("integ")
@Testcontainers
public abstract class SpringIntegrationTest {

    @Autowired
    private JdbcTemplate entitlementJdbc;

    @Autowired
    private com.tubeshadow.auth.repository.UserRepository entitlementUsers;

    /**
     * PAY-1: Shadow writes (clips, recordings, decks, library, import, practice progression) are
     * capability-gated. Tests exercising the paid workflow — not the gate itself — grant both
     * capabilities to their user here, mirroring the V21 MIGRATION backfill shape.
     *
     * <p>The user id is resolved through a JPA query first: in @Transactional tests the signup's
     * users row is still unflushed, and a plain JDBC {@code INSERT ... SELECT FROM users} would
     * silently insert nothing. The JPQL lookup forces Hibernate's auto-flush, then the JDBC insert
     * runs against the flushed row on the same transaction-bound connection.
     */
    protected void grantPaidCapabilities(String email) {
        java.util.UUID userId = entitlementUsers.findByEmail(email).orElseThrow().getId();
        for (String capability : new String[]{"SHADOW_ACCESS", "AI_ACCESS"}) {
            entitlementJdbc.update("""
                    INSERT INTO user_entitlements
                        (user_id, capability, source, environment, status, last_verified_at, created_at)
                    VALUES (?, ?, 'MIGRATION', 'PRODUCTION', 'ACTIVE', now(), now())
                    ON CONFLICT DO NOTHING
                    """, userId, capability);
        }
    }

    @SuppressWarnings("resource")
    private static final PostgreSQLContainer<?> POSTGRES = new PostgreSQLContainer<>("postgres:16-alpine")
            .withDatabaseName("tubeshadow_integ")
            .withUsername("tubeshadow")
            .withPassword("tubeshadow")
            .withReuse(true);

    static {
        POSTGRES.start();
    }

    @DynamicPropertySource
    static void postgresProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", POSTGRES::getJdbcUrl);
        registry.add("spring.datasource.username", POSTGRES::getUsername);
        registry.add("spring.datasource.password", POSTGRES::getPassword);
        registry.add("spring.datasource.driver-class-name", () -> "org.postgresql.Driver");
        registry.add("spring.jpa.hibernate.ddl-auto", () -> "validate");
        registry.add("spring.flyway.enabled", () -> "true");
        registry.add("spring.flyway.locations", () -> "classpath:db/migration");
    }
}
