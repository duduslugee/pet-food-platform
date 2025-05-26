package com.petfood.catalogservice.controller;

import com.petfood.catalogservice.model.Product;
import com.petfood.catalogservice.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {

    @Autowired
    private ProductRepository repository;

    @GetMapping
    public List<Product> getAllProducts() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public Product getProductById(@PathVariable String id) {
        return repository.findById(id).orElseThrow(() -> new RuntimeException("Product not found"));
    }

    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        // Validar o produto
        if (product.getId() == null || product.getName() == null || product.getPrice() <= 0) {
            return ResponseEntity.badRequest().build();
        }

        // Verificar se o ID já existe
        Optional<Product> existingProduct = repository.findById(product.getId());
        if (existingProduct.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        }

        // Salvar o produto
        Product savedProduct = repository.save(product);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedProduct);
    }
}