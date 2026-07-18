package com.finance.finance_tracker.dto;

import com.finance.finance_tracker.enums.Category;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
public class CategoryReportResponse {

    private Category category;

    private BigDecimal amount;
}