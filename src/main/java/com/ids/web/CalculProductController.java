package com.ids.web;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ids.entity.CalculProduct;
import com.ids.repository.CalculProductRepository;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/v1/calculProducts")
@CrossOrigin("*")
@AllArgsConstructor
public class CalculProductController {

	private CalculProductRepository repo;

	@RequestMapping
	public List<CalculProduct> getAll() {
		return (List<CalculProduct>) repo.findAll();
	}

}
