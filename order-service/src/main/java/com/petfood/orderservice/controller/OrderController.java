package com.petfood.orderservice.controller;

import com.petfood.orderservice.model.Order;
import com.petfood.orderservice.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/orders")
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {

    @Autowired
    private OrderRepository repository;

    @Autowired
    private RestTemplate restTemplate;

    @PostMapping
    public Order createOrder(@RequestBody Order order) {
        order.setId(UUID.randomUUID().toString());
        order.setStatus("PENDING");

        // Calcular total chamando o serviço de produtos
        double total = 0;
        for (String productId : order.getProductIds()) {
            Product product = restTemplate.getForObject("http://catalog-service:8081/products/" + productId, Product.class);
            if (product != null) {
                total += product.getPrice();
            }
        }
        order.setTotal(total);

        // Chamar o serviço de pagamento
        PaymentResponse paymentResponse = restTemplate.postForObject("http://payment-service:8084/payments", order, PaymentResponse.class);
        if (paymentResponse != null && paymentResponse.isSuccess()) {
            order.setStatus("CONFIRMED");
        } else {
            order.setStatus("FAILED");
        }

        return repository.save(order);
    }

    @GetMapping("/user/{userId}")
    public List<Order> getOrdersByUser(@PathVariable String userId) {
        return repository.findByUserId(userId);
    }
}

class Product {
    private String id;
    private double price;

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }
}

class PaymentResponse {
    private boolean success;

    public boolean isSuccess() { return success; }
    public void setSuccess(boolean success) { this.success = success; }
}