package com.tubeshadow.billing.repository;

import com.tubeshadow.billing.domain.UserEntitlement;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface UserEntitlementRepository extends JpaRepository<UserEntitlement, UserEntitlement.Key> {

    List<UserEntitlement> findByUserId(UUID userId);
}
