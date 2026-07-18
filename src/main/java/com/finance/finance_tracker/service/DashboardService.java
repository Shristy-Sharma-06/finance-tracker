package com.finance.finance_tracker.service;

import com.finance.finance_tracker.dto.DashboardResponse;
import com.finance.finance_tracker.entity.Budget;
import com.finance.finance_tracker.entity.Transaction;
import com.finance.finance_tracker.entity.User;
import com.finance.finance_tracker.enums.TransactionType;
import com.finance.finance_tracker.repository.BudgetRepository;
import com.finance.finance_tracker.repository.TransactionRepository;
import com.finance.finance_tracker.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import com.finance.finance_tracker.dto.MonthlyTrendResponse;
import java.time.Month;
import java.util.Map;
import java.util.stream.Collectors;

import com.finance.finance_tracker.dto.CategoryExpenseResponse;
import com.finance.finance_tracker.enums.Category;


@Service
@RequiredArgsConstructor
public class DashboardService {

    private final UserRepository userRepository;
    private final TransactionRepository transactionRepository;
    private final BudgetRepository budgetRepository;

    public DashboardResponse getDashboard(Authentication authentication){

        User user = userRepository.findByUsername(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Transaction> incomes =
                transactionRepository.findByUserAndTransactionType(user, TransactionType.INCOME);

        List<Transaction> expenses =
                transactionRepository.findByUserAndTransactionType(user, TransactionType.EXPENSE);

        BigDecimal totalIncome = incomes.stream()
                .map(Transaction::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal totalExpense = expenses.stream()
                .map(Transaction::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal savings = totalIncome.subtract(totalExpense);

        int month = LocalDate.now().getMonthValue();
        int year = LocalDate.now().getYear();

        List<Budget> budgets =
                budgetRepository.findByUserAndMonthAndYear(user, month, year);

        BigDecimal monthlyBudget = budgets.stream()
                .map(Budget::getMonthlyLimit)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal remainingBudget =
                monthlyBudget.subtract(totalExpense);

        long totalTransactions =
                transactionRepository.findByUser(user).size();

        return DashboardResponse.builder()
                .totalIncome(totalIncome)
                .totalExpense(totalExpense)
                .savings(savings)
                .monthlyBudget(monthlyBudget)
                .remainingBudget(remainingBudget)
                .totalTransactions(totalTransactions)
                .build();
    }

    public List<MonthlyTrendResponse> getMonthlyTrends(Authentication authentication) {

        User user = userRepository.findByUsername(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Transaction> expenses =
                transactionRepository.findByUserAndTransactionType(
                        user,
                        TransactionType.EXPENSE
                );

        Map<Month, BigDecimal> monthlyData = expenses.stream()
                .collect(Collectors.groupingBy(
                        transaction -> transaction.getDate().getMonth(),
                        Collectors.mapping(
                                Transaction::getAmount,
                                Collectors.reducing(BigDecimal.ZERO, BigDecimal::add)
                        )
                ));

        return monthlyData.entrySet()
                .stream()
                .sorted(Map.Entry.comparingByKey())
                .map(entry -> new MonthlyTrendResponse(
                        entry.getKey().name(),
                        entry.getValue()
                ))
                .toList();
    }

    public List<CategoryExpenseResponse> getCategoryWiseExpense(Authentication authentication) {

        User user = userRepository.findByUsername(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Transaction> expenses =
                transactionRepository.findByUserAndTransactionType(
                        user,
                        TransactionType.EXPENSE
                );

        Map<Category, BigDecimal> categoryData = expenses.stream()
                .collect(Collectors.groupingBy(
                        Transaction::getCategory,
                        Collectors.mapping(
                                Transaction::getAmount,
                                Collectors.reducing(BigDecimal.ZERO, BigDecimal::add)
                        )
                ));

        return categoryData.entrySet()
                .stream()
                .map(entry -> new CategoryExpenseResponse(
                        entry.getKey(),
                        entry.getValue()
                ))
                .toList();
    }
}