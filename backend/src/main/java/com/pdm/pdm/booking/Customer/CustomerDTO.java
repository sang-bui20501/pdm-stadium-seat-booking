package com.pdm.pdm.booking.Customer;

public class CustomerDTO {
    public String username;
    public String userId;
    public String token;

    public CustomerDTO(String username, String userId, String token) {
        this.username = username;
        this.userId = userId;
        this.token = token;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
