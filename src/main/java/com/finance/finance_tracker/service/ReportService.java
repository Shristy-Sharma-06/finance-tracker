package com.finance.finance_tracker.service;

import com.finance.finance_tracker.dto.CategoryReportResponse;
import com.finance.finance_tracker.dto.MonthlyReportResponse;
import com.finance.finance_tracker.entity.Transaction;
import com.finance.finance_tracker.entity.User;
import com.finance.finance_tracker.enums.Category;
import com.finance.finance_tracker.enums.TransactionType;
import com.finance.finance_tracker.repository.TransactionRepository;
import com.finance.finance_tracker.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import com.finance.finance_tracker.dto.AnnualReportResponse;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.finance.finance_tracker.util.PdfGenerator;
import com.finance.finance_tracker.util.CsvGenerator;

import java.io.ByteArrayInputStream;

@Service
@RequiredArgsConstructor
public class ReportService {

    private final UserRepository userRepository;
    private final TransactionRepository transactionRepository;
    private final PdfGenerator pdfGenerator;
    private final CsvGenerator csvGenerator;

    public MonthlyReportResponse getMonthlyReport(
            Integer month,
            Integer year,
            Authentication authentication) {

        User user = userRepository.findByUsername(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        LocalDate startDate = LocalDate.of(year, month, 1);
        LocalDate endDate = startDate.withDayOfMonth(startDate.lengthOfMonth());

        List<Transaction> incomes =
                transactionRepository.findByUserAndTransactionTypeAndDateBetween(
                        user,
                        TransactionType.INCOME,
                        startDate,
                        endDate);

        List<Transaction> expenses =
                transactionRepository.findByUserAndTransactionTypeAndDateBetween(
                        user,
                        TransactionType.EXPENSE,
                        startDate,
                        endDate);

        BigDecimal totalIncome = incomes.stream()
                .map(Transaction::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal totalExpense = expenses.stream()
                .map(Transaction::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal savings = totalIncome.subtract(totalExpense);

        long totalTransactions = incomes.size() + expenses.size();

        Map<Category, BigDecimal> categoryWiseExpense =
                expenses.stream()
                        .collect(Collectors.groupingBy(
                                Transaction::getCategory,
                                Collectors.mapping(
                                        Transaction::getAmount,
                                        Collectors.reducing(BigDecimal.ZERO, BigDecimal::add)
                                )
                        ));

        return MonthlyReportResponse.builder()
                .month(month)
                .year(year)
                .totalIncome(totalIncome)
                .totalExpense(totalExpense)
                .savings(savings)
                .totalTransactions(totalTransactions)
                .categoryWiseExpense(categoryWiseExpense)
                .build();
    }

    public AnnualReportResponse getAnnualReport(
            Integer year,
            Authentication authentication) {

        User user = userRepository.findByUsername(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        LocalDate startDate = LocalDate.of(year, 1, 1);
        LocalDate endDate = LocalDate.of(year, 12, 31);

        List<Transaction> transactions =
                transactionRepository.findByUserAndDateBetween(
                        user,
                        startDate,
                        endDate);

        BigDecimal totalIncome = transactions.stream()
                .filter(t -> t.getTransactionType() == TransactionType.INCOME)
                .map(Transaction::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal totalExpense = transactions.stream()
                .filter(t -> t.getTransactionType() == TransactionType.EXPENSE)
                .map(Transaction::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal totalSavings = totalIncome.subtract(totalExpense);

        return AnnualReportResponse.builder()
                .year(year)
                .totalIncome(totalIncome)
                .totalExpense(totalExpense)
                .totalSavings(totalSavings)
                .totalTransactions((long) transactions.size())
                .build();
    }

    public List<CategoryReportResponse> getCategoryWiseReport(
            Authentication authentication) {

        User user = userRepository.findByUsername(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Transaction> expenses =
                transactionRepository.findByUserAndTransactionType(
                        user,
                        TransactionType.EXPENSE);

        Map<Category, BigDecimal> categoryData =
                expenses.stream()
                        .collect(Collectors.groupingBy(
                                Transaction::getCategory,
                                Collectors.mapping(
                                        Transaction::getAmount,
                                        Collectors.reducing(BigDecimal.ZERO, BigDecimal::add)
                                )
                        ));

        return categoryData.entrySet()
                .stream()
                .map(entry -> new CategoryReportResponse(
                        entry.getKey(),
                        entry.getValue()
                ))
                .toList();
    }

    public ByteArrayInputStream exportMonthlyReportPdf(
            Integer month,
            Integer year,
            Authentication authentication) {

        MonthlyReportResponse report =
                getMonthlyReport(month, year, authentication);

        return pdfGenerator.generateMonthlyReport(report);
    }

    public ByteArrayInputStream exportMonthlyReportCsv(
            Integer month,
            Integer year,
            Authentication authentication) {

        MonthlyReportResponse report =
                getMonthlyReport(month, year, authentication);

        return csvGenerator.generateMonthlyReport(report);
    }
}