package com.finance.finance_tracker.controller;

import com.finance.finance_tracker.dto.CategoryExpenseResponse;
import com.finance.finance_tracker.dto.DashboardResponse;
import com.finance.finance_tracker.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.finance.finance_tracker.dto.MonthlyTrendResponse;

import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    //@GetMapping
    //public DashboardResponse getDashboard(Authentication authentication){

      //  return dashboardService.getDashboard(authentication);
    //}

    @GetMapping
    public DashboardResponse getDashboard(Authentication authentication) {

        System.out.println("===== Dashboard Controller Hit =====");

        return dashboardService.getDashboard(authentication);

    }


    @GetMapping("/monthly-trends")
    public List<MonthlyTrendResponse> getMonthlyTrends(
            Authentication authentication){

        return dashboardService.getMonthlyTrends(authentication);
    }

    @GetMapping("/category-expense")
    public List<CategoryExpenseResponse> getCategoryWiseExpense(
            Authentication authentication){

        return dashboardService.getCategoryWiseExpense(authentication);
    }
}