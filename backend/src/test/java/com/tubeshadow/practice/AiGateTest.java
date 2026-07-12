package com.tubeshadow.practice;

import com.tubeshadow.common.exception.BusinessException;
import com.tubeshadow.practice.application.AiGate;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class AiGateTest {

    @Test
    void blankAllowlistBlocksEveryone() {
        AiGate gate = new AiGate("");
        assertThatThrownBy(() -> gate.assertAllowed("anyone@example.com"))
                .isInstanceOf(BusinessException.class); // deny-by-default
        assertThatThrownBy(() -> new AiGate(null).assertAllowed("x@y.com"))
                .isInstanceOf(BusinessException.class);
    }

    @Test
    void allowsListedEmailsCaseInsensitivelyBlocksOthers() {
        AiGate gate = new AiGate("owner@example.com, second@example.com");
        assertThatCode(() -> gate.assertAllowed("Owner@Example.com")).doesNotThrowAnyException();
        assertThatCode(() -> gate.assertAllowed(" second@example.com ")).doesNotThrowAnyException();
        assertThatThrownBy(() -> gate.assertAllowed("stranger@example.com"))
                .isInstanceOf(BusinessException.class);
        assertThatThrownBy(() -> gate.assertAllowed(null)).isInstanceOf(BusinessException.class);
    }
}
