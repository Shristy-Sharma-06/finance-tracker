package com.finance.finance_tracker.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RegisterResponse {

    private Long id;
    private String fullName;
    private String username;
    private String email;
    private String role;
}