package com.petfood.catalogservice.repository;

import com.petfood.catalogservice.model.Product;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProductRepository extends MongoRepository<Product, String> {
}