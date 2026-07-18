package com.finance.finance_tracker.service;
import com.finance.finance_tracker.dto.BudgetRequest;
import com.finance.finance_tracker.dto.BudgetResponse;
import com.finance.finance_tracker.entity.Budget;
import com.finance.finance_tracker.entity.User;
import com.finance.finance_tracker.repository.BudgetRepository;
import com.finance.finance_tracker.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BudgetService {

    private final BudgetRepository budgetRepository;
    private final UserRepository userRepository;

    // Add Budget
    public BudgetResponse addBudget(BudgetRequest request,
                                    Authentication authentication) {

        User user = userRepository.findByUsername(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Budget budget = Budget.builder()
                .monthlyLimit(request.getMonthlyLimit())
                .category(request.getCategory())
                .month(request.getMonth())
                .year(request.getYear())
                .user(user)
                .build();

        Budget saved = budgetRepository.save(budget);

        return mapToResponse(saved);
    }

    // Get All Budgets
    public List<BudgetResponse> getAllBudgets(Authentication authentication) {

        User user = userRepository.findByUsername(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        return budgetRepository.findByUser(user)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    // Get Budget By Id
    public BudgetResponse getBudgetById(Long id,
                                        Authentication authentication) {

        User user = userRepository.findByUsername(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Budget budget = budgetRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new RuntimeException("Budget not found"));

        return mapToResponse(budget);
    }

    // Update Budget
    public BudgetResponse updateBudget(Long id,
                                       BudgetRequest request,
                                       Authentication authentication) {

        User user = userRepository.findByUsername(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Budget budget = budgetRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new RuntimeException("Budget not found"));

        budget.setMonthlyLimit(request.getMonthlyLimit());
        budget.setCategory(request.getCategory());
        budget.setMonth(request.getMonth());
        budget.setYear(request.getYear());

        Budget updated = budgetRepository.save(budget);

        return mapToResponse(updated);
    }

    // Delete Budget
    public void deleteBudget(Long id,
                             Authentication authentication) {

        User user = userRepository.findByUsername(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Budget budget = budgetRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new RuntimeException("Budget not found"));

        budgetRepository.delete(budget);
    }

    // Mapper
    private BudgetResponse mapToResponse(Budget budget) {

        return BudgetResponse.builder()
                .id(budget.getId())
                .monthlyLimit(budget.getMonthlyLimit())
                .category(budget.getCategory())
                .month(budget.getMonth())
                .year(budget.getYear())
                .build();
    }
}
