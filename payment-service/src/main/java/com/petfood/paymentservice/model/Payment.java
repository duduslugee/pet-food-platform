package com.petfood.paymentservice.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "payments")
public class Payment {
    @Id
    private String id;
    private String orderId;
    private double amount;
    private boolean success;

    // Construtores, getters e setters
    public Payment() {}
    public Payment(String id, String orderId, double amount, boolean success) {
        this.id = id;
        this.orderId = orderId;
        this.amount = amount;
        this.success = success;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getOrderId() { return orderId; }
    public void setOrderId(String orderId) { this.orderId = orderId; }
    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }
    public boolean isSuccess() { return success; }
    public void setSuccess(boolean success) { this.success = success; }
}