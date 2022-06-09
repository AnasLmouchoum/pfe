package com.ids.web;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ids.entity.ProductDone;
import com.ids.repository.ProductDoneRepository;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/v1/productsDone")
@CrossOrigin("*")
@AllArgsConstructor
public class ProductDoneController {

	private ProductDoneRepository repo;

	@RequestMapping
	public List<ProductDone> getAll() {
		return (List<ProductDone>) repo.findAll();
	}

}
