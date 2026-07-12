package com.finance.finance_tracker.service;

import com.finance.finance_tracker.dto.TransactionRequest;
import com.finance.finance_tracker.dto.TransactionResponse;
import com.finance.finance_tracker.entity.Transaction;
import com.finance.finance_tracker.entity.User;
import com.finance.finance_tracker.repository.TransactionRepository;
import com.finance.finance_tracker.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TransactionService {

    private final TransactionRepository transactionRepository;
    private final UserRepository userRepository;

    // Add Transaction
    public TransactionResponse addTransaction(TransactionRequest request,
                                              Authentication authentication) {

        User user = userRepository.findByUsername(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Transaction transaction = Transaction.builder()
                .amount(request.getAmount())
                .transactionType(request.getTransactionType())
                .category(request.getCategory())
                .description(request.getDescription())
                .date(request.getDate())
                .user(user)
                .build();

        return mapToResponse(transactionRepository.save(transaction));
    }

    // Get All Transactions
    public List<TransactionResponse> getAllTransactions(Authentication authentication) {

        User user = userRepository.findByUsername(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        return transactionRepository.findByUser(user)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    // Get Transaction By Id
    public TransactionResponse getTransactionById(Long id,
                                                  Authentication authentication) {

        User user = userRepository.findByUsername(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Transaction transaction = transactionRepository
                .findByIdAndUser(id, user)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));

        return mapToResponse(transaction);
    }

    // Update Transaction
    public TransactionResponse updateTransaction(Long id,
                                                 TransactionRequest request,
                                                 Authentication authentication) {

        User user = userRepository.findByUsername(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Transaction transaction = transactionRepository
                .findByIdAndUser(id, user)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));

        transaction.setAmount(request.getAmount());
        transaction.setTransactionType(request.getTransactionType());
        transaction.setCategory(request.getCategory());
        transaction.setDescription(request.getDescription());
        transaction.setDate(request.getDate());

        return mapToResponse(transactionRepository.save(transaction));
    }

    // Delete Transaction
    public void deleteTransaction(Long id,
                                  Authentication authentication) {

        User user = userRepository.findByUsername(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Transaction transaction = transactionRepository
                .findByIdAndUser(id, user)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));

        transactionRepository.delete(transaction);
    }

    // Common Mapper
    private TransactionResponse mapToResponse(Transaction transaction) {

        return TransactionResponse.builder()
                .id(transaction.getId())
                .amount(transaction.getAmount())
                .transactionType(transaction.getTransactionType())
                .category(transaction.getCategory())
                .description(transaction.getDescription())
                .date(transaction.getDate())
                .build();
    }
}