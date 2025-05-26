package com.petfood.paymentservice.controller;

import com.petfood.paymentservice.model.Payment;
import com.petfood.paymentservice.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Random;
import java.util.UUID;

@RestController
@RequestMapping("/payments")
@CrossOrigin(origins = "http://localhost:3000")
public class PaymentController {

    @Autowired
    private PaymentRepository repository;

    @PostMapping
    public PaymentResponse processPayment(@RequestBody Order order) {
        // Simulação de pagamento (50% de chance de sucesso)
        boolean success = new Random().nextBoolean();
        Payment payment = new Payment(UUID.randomUUID().toString(), order.getId(), order.getTotal(), success);
        repository.save(payment);

        PaymentResponse response = new PaymentResponse();
        response.setSuccess(success);
        return response;
    }
}

class Order {
    private String id;
    private double total;

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public double getTotal() { return total; }
    public void setTotal(double total) { this.total = total; }
}

class PaymentResponse {
    private boolean success;

    public boolean isSuccess() { return success; }
    public void setSuccess(boolean success) { this.success = success; }
}