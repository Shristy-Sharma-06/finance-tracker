package com.finance.finance_tracker.repository;

import com.finance.finance_tracker.entity.Budget;
import com.finance.finance_tracker.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BudgetRepository extends JpaRepository<Budget, Long> {

    List<Budget> findByUser(User user);

    Optional<Budget> findByIdAndUser(Long id, User user);

    //Optional<Budget> findByUserAndMonthAndYear(User user, Integer month, Integer year);

    List<Budget> findByUserAndMonthAndYear(User user, Integer month, Integer year);

}