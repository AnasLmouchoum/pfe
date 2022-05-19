package com.ids.web;

import java.util.List;
import java.util.UUID;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ids.data.web.AbstractCrudController;
import com.ids.entity.Client;
import com.ids.repository.ClientRepository;

import lombok.AllArgsConstructor;

//http://localhost:1000/api/v1/clients
@RestController
@RequestMapping("/api/v1/clients")
@CrossOrigin("*")
@AllArgsConstructor
public class ClientController extends AbstractCrudController<Client, UUID> {
	public ClientRepository repository;

	@GetMapping("/all")
	public List<Client> all() {
		return repository.findAsc();
	}

	@GetMapping("/ids")
	public List<String> getIds() {
		return repository.getids();
	}
}
