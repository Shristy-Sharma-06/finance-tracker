package com.finance.finance_tracker.util;

import com.finance.finance_tracker.dto.MonthlyReportResponse;
import com.finance.finance_tracker.enums.Category;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVPrinter;
import org.springframework.stereotype.Component;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.OutputStreamWriter;
import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.util.Map;

@Component
public class CsvGenerator {

    public ByteArrayInputStream generateMonthlyReport(MonthlyReportResponse report) {

        ByteArrayOutputStream out = new ByteArrayOutputStream();

        try (
                CSVPrinter csvPrinter = new CSVPrinter(
                        new OutputStreamWriter(out, StandardCharsets.UTF_8),
                        CSVFormat.DEFAULT)
        ) {

            csvPrinter.printRecord("PERSONAL FINANCE TRACKER");
            csvPrinter.println();

            csvPrinter.printRecord("Month", report.getMonth());
            csvPrinter.printRecord("Year", report.getYear());
            csvPrinter.println();

            csvPrinter.printRecord("Total Income", report.getTotalIncome());
            csvPrinter.printRecord("Total Expense", report.getTotalExpense());
            csvPrinter.printRecord("Savings", report.getSavings());
            csvPrinter.printRecord("Total Transactions", report.getTotalTransactions());

            csvPrinter.println();

            csvPrinter.printRecord("Category", "Amount");

            for (Map.Entry<Category, BigDecimal> entry : report.getCategoryWiseExpense().entrySet()) {

                csvPrinter.printRecord(
                        entry.getKey().name(),
                        entry.getValue()
                );
            }

            csvPrinter.flush();

        } catch (Exception e) {
            throw new RuntimeException("Error generating CSV", e);
        }

        return new ByteArrayInputStream(out.toByteArray());
    }
}