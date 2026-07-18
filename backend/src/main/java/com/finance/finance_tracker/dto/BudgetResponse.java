package com.finance.finance_tracker.dto;

import com.finance.finance_tracker.enums.Category;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class BudgetResponse {

    private Long id;

    private BigDecimal monthlyLimit;

    private Category category;

    private Integer month;

    private Integer year;
}