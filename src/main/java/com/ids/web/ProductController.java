package com.ids.web;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ids.data.web.AbstractCrudController;
import com.ids.entity.Product;
import com.ids.repository.ProductRepository;

import lombok.AllArgsConstructor;

//http://localhost:1000/api/v1/products
@RestController
@RequestMapping("/api/v1/products")
@CrossOrigin("*")
@AllArgsConstructor
public class ProductController extends AbstractCrudController<Product, UUID> {

	private ProductRepository repository;

	@GetMapping("/idarticle/{idArticle}")
	public List<Product> ByIdArticle(@PathVariable UUID idArticle) {
		return repository.findByIdArticle(idArticle);
	}

	@GetMapping("/notDone")
	public List<Product> getNotDone() {
		List<Product> products = repository.findAll();
		return products.stream().filter(p -> p.getCommeFait() == false).collect(Collectors.toList());
	}

}