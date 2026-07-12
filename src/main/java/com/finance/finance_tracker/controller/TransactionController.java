package com.finance.finance_tracker.controller;

import com.finance.finance_tracker.dto.TransactionRequest;
import com.finance.finance_tracker.dto.TransactionResponse;
import com.finance.finance_tracker.service.TransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
@RequiredArgsConstructor
public class TransactionController {

    private final TransactionService transactionService;

    // Add Transaction
    @PostMapping
    public ResponseEntity<TransactionResponse> addTransaction(
            @RequestBody TransactionRequest request,
            Authentication authentication) {

        return new ResponseEntity<>(
                transactionService.addTransaction(request, authentication),
                HttpStatus.CREATED);
    }

    // Get All Transactions
    @GetMapping
    public ResponseEntity<List<TransactionResponse>> getAllTransactions(
            Authentication authentication) {

        return ResponseEntity.ok(
                transactionService.getAllTransactions(authentication));
    }

    // Get Transaction By Id
    @GetMapping("/{id}")
    public ResponseEntity<TransactionResponse> getTransactionById(
            @PathVariable Long id,
            Authentication authentication) {

        return ResponseEntity.ok(
                transactionService.getTransactionById(id, authentication));
    }

    // Update Transaction
    @PutMapping("/{id}")
    public ResponseEntity<TransactionResponse> updateTransaction(
            @PathVariable Long id,
            @RequestBody TransactionRequest request,
            Authentication authentication) {

        return ResponseEntity.ok(
                transactionService.updateTransaction(id, request, authentication));
    }

    // Delete Transaction
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTransaction(
            @PathVariable Long id,
            Authentication authentication) {

        transactionService.deleteTransaction(id, authentication);

        return ResponseEntity.ok("Transaction deleted successfully.");
    }
}