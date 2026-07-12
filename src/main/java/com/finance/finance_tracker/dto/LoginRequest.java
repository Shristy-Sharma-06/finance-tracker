package com.finance.finance_tracker.dto;


import lombok.Data;

@Data
public class LoginRequest {

    private String username;
    private String password;
}