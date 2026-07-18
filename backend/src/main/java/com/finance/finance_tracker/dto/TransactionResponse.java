package com.finance.finance_tracker.dto;


import com.finance.finance_tracker.enums.Category;
import com.finance.finance_tracker.enums.TransactionType;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Builder
public class TransactionResponse {

    private Long id;

    private BigDecimal amount;

    private TransactionType transactionType;

    private Category category;

    private String description;

    private LocalDate date;
}