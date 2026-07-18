package com.finance.finance_tracker.dto;

import com.finance.finance_tracker.enums.Category;
import com.finance.finance_tracker.enums.TransactionType;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class TransactionRequest {

    @NotNull(message = "Amount is required")
    @Positive(message = "Amount must be greater than zero")
    private BigDecimal amount;

    @NotNull(message = "Transaction type is required")
    private TransactionType transactionType;

    @NotNull(message = "Category is required")
    private Category category;

    private String description;

    @NotNull(message = "Date is required")
    private LocalDate date;
}