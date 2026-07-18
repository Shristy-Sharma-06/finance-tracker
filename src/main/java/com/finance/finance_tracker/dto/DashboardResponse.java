package com.finance.finance_tracker.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class DashboardResponse {

    private BigDecimal totalIncome;

    private BigDecimal totalExpense;

    private BigDecimal savings;

    private BigDecimal monthlyBudget;

    private BigDecimal remainingBudget;

    private Long totalTransactions;
}