package com.tubeshadow.billing.api;

import com.tubeshadow.auth.api.dto.MeResponse;
import com.tubeshadow.auth.security.AuthenticatedUser;
import com.tubeshadow.auth.security.CurrentUser;
import com.tubeshadow.billing.application.AccessPolicy;
import com.tubeshadow.billing.application.BillingEntitlementProvider;
import com.tubeshadow.billing.application.EntitlementSyncService;
import com.tubeshadow.common.web.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Authenticated purchase/restore convergence (docs/MONETIZATION-DESIGN.md §8.3). The server
 * derives the user id from the JWT ONLY — it never accepts a caller-supplied target user id, so a
 * patched client cannot sync someone else's entitlement. Rate-limited per-user AND in aggregate
 * ({@link BillingSyncRateLimitInterceptor}, registered on this path in WebMvcConfig) so this
 * cannot be used to run up unbounded RevenueCat REST spend.
 */
@RestController
@RequestMapping("/api/billing")
@Tag(name = "Billing", description = "Authenticated purchase/restore sync")
@SecurityRequirement(name = "bearerAuth")
public class BillingSyncController {

    private final BillingEntitlementProvider provider;
    private final EntitlementSyncService syncService;
    private final AccessPolicy accessPolicy;

    public BillingSyncController(BillingEntitlementProvider provider, EntitlementSyncService syncService,
                                 AccessPolicy accessPolicy) {
        this.provider = provider;
        this.syncService = syncService;
        this.accessPolicy = accessPolicy;
    }

    @PostMapping("/sync")
    @Operation(summary = "Fetch this user's current RevenueCat snapshot and apply it — call after purchase/restore")
    public ApiResponse<MeResponse.Entitlements> sync(@CurrentUser AuthenticatedUser user) {
        BillingEntitlementProvider.ProviderSnapshot snapshot = provider.fetchSnapshot(user.id().toString());
        syncService.apply(user.id(), snapshot);
        return ApiResponse.ok(MeResponse.entitlementsOf(accessPolicy.effectiveSnapshot(user.id())));
    }
}
