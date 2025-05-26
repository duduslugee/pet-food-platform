package com.petfood.catalogservice.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "products")
public class Product {
    @Id
    private String id;
    private String name;
    private String type;
    private String description;
    private double weight;
    private double price;
    private boolean available;

    // Construtor padrão (necessário para o MongoDB)
    public Product() {}

    // Construtor com parâmetros
    public Product(String id, String name, String type, String description, double weight, double price, boolean available) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.description = description;
        this.weight = weight;
        this.price = price;
        this.available = available;
    }

    // Getters e Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public double getWeight() { return weight; }
    public void setWeight(double weight) { this.weight = weight; }
    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }
    public boolean isAvailable() { return available; }
    public void setAvailable(boolean available) { this.available = available; }
}