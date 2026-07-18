package com.finance.finance_tracker.controller;

import com.finance.finance_tracker.dto.AnnualReportResponse;
import com.finance.finance_tracker.dto.MonthlyReportResponse;
import com.finance.finance_tracker.service.ReportService;
import com.finance.finance_tracker.dto.CategoryReportResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import java.io.ByteArrayInputStream;

import java.util.List;

@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
public class ReportController {

    private final ReportService reportService;

    @GetMapping("/monthly")
    public MonthlyReportResponse getMonthlyReport(
            @RequestParam Integer month,
            @RequestParam Integer year,
            Authentication authentication) {

        return reportService.getMonthlyReport(
                month,
                year,
                authentication);
    }

    @GetMapping("/annual")
    public AnnualReportResponse getAnnualReport(
            @RequestParam Integer year,
            Authentication authentication) {

        return reportService.getAnnualReport(
                year,
                authentication);
    }

    @GetMapping("/category-wise")
    public List<CategoryReportResponse> getCategoryWiseReport(
            Authentication authentication) {

        return reportService.getCategoryWiseReport(authentication);
    }

    @GetMapping("/export/pdf")
    public ResponseEntity<InputStreamResource> exportMonthlyReportPdf(
            @RequestParam Integer month,
            @RequestParam Integer year,
            Authentication authentication) {

        ByteArrayInputStream pdf =
                reportService.exportMonthlyReportPdf(
                        month,
                        year,
                        authentication);

        HttpHeaders headers = new HttpHeaders();

        headers.add(
                HttpHeaders.CONTENT_DISPOSITION,
                "attachment; filename=Monthly_Report.pdf");

        return ResponseEntity.ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_PDF)
                .body(new InputStreamResource(pdf));
    }

    @GetMapping("/export/csv")
    public ResponseEntity<InputStreamResource> exportMonthlyReportCsv(
            @RequestParam Integer month,
            @RequestParam Integer year,
            Authentication authentication) {

        ByteArrayInputStream csv =
                reportService.exportMonthlyReportCsv(
                        month,
                        year,
                        authentication);

        HttpHeaders headers = new HttpHeaders();

        headers.add(
                HttpHeaders.CONTENT_DISPOSITION,
                "attachment; filename=Monthly_Report.csv");

        return ResponseEntity.ok()
                .headers(headers)
                .contentType(MediaType.parseMediaType("text/csv"))
                .body(new InputStreamResource(csv));
    }
}