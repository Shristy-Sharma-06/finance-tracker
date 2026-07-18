package com.finance.finance_tracker.repository;
import com.finance.finance_tracker.enums.TransactionType;
import com.finance.finance_tracker.entity.Transaction;
import com.finance.finance_tracker.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;
import java.time.LocalDate;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    List<Transaction> findByUser(User user);
    Optional<Transaction> findByIdAndUser(Long id, User user);

    List<Transaction> findByUserAndTransactionType(User user, TransactionType transactionType);

    //List<Transaction> findByUserAndDateBetween(User user,
       //                                        LocalDate startDate,
         //                                      LocalDate endDate);

    List<Transaction> findByUserAndDateBetween(
            User user,
            LocalDate startDate,
            LocalDate endDate);


    List<Transaction> findByUserAndTransactionTypeAndDateBetween(
            User user,
            TransactionType transactionType,
            LocalDate startDate,
            LocalDate endDate);

    
}