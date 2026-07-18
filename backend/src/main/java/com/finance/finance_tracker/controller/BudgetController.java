package com.finance.finance_tracker.controller;

import com.finance.finance_tracker.dto.BudgetRequest;
import com.finance.finance_tracker.dto.BudgetResponse;
import com.finance.finance_tracker.service.BudgetService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/budgets")
@RequiredArgsConstructor
public class BudgetController {

    private final BudgetService budgetService;

    // Add Budget
    @PostMapping
    public ResponseEntity<BudgetResponse> addBudget(
            @Valid
            @RequestBody BudgetRequest request,
            Authentication authentication) {

        return new ResponseEntity<>(
                budgetService.addBudget(request, authentication),
                HttpStatus.CREATED);
    }

    // Get All Budgets
    @GetMapping
    public ResponseEntity<List<BudgetResponse>> getAllBudgets(
            Authentication authentication) {

        return ResponseEntity.ok(
                budgetService.getAllBudgets(authentication));
    }

    // Get Budget By Id
    @GetMapping("/{id}")
    public ResponseEntity<BudgetResponse> getBudgetById(
            @PathVariable Long id,
            Authentication authentication) {

        return ResponseEntity.ok(
                budgetService.getBudgetById(id, authentication));
    }

    // Update Budget
    @PutMapping("/{id}")
    public ResponseEntity<BudgetResponse> updateBudget(
            @PathVariable Long id, @Valid
            @RequestBody BudgetRequest request,
            Authentication authentication) {

        return ResponseEntity.ok(
                budgetService.updateBudget(id, request, authentication));
    }

    // Delete Budget
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBudget(
            @PathVariable Long id,
            Authentication authentication) {

        budgetService.deleteBudget(id, authentication);

        return ResponseEntity.ok("Budget deleted successfully");
    }
}