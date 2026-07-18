package com.finance.finance_tracker.dto;

import com.finance.finance_tracker.enums.Category;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.util.Map;

@Data
@Builder
public class MonthlyReportResponse {

    private Integer month;

    private Integer year;

    private BigDecimal totalIncome;

    private BigDecimal totalExpense;

    private BigDecimal savings;

    private Long totalTransactions;

    private Map<Category, BigDecimal> categoryWiseExpense;
}