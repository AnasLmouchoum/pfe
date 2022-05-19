package com.ids.web;

import java.util.List;
import java.util.UUID;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ids.data.web.AbstractCrudController;
import com.ids.entity.AdressLiv;
import com.ids.repository.AdressLivRepository;
import com.ids.service.AdressLivService;

import lombok.AllArgsConstructor;

//http://localhost:1000/api/v1/AdressLivs
@RestController
@RequestMapping("/api/v1/adressLivs")
@CrossOrigin("*")
@AllArgsConstructor
public class AdressLivController extends AbstractCrudController<AdressLiv, UUID> {
	public AdressLivRepository repository;
	private AdressLivService service;

	@GetMapping("/idclient/{idClient}")
	public List<AdressLiv> ByIdClient(@PathVariable UUID idClient) {
		return repository.findByIdClient(idClient);
	}

	@PostMapping("/post")
	public void onSave(@RequestBody AdressLiv adressLiv) {
		service.onSave(adressLiv);
	}

	@PutMapping("/put/{id}")
	public void onEdit(@RequestBody AdressLiv adressLiv, @PathVariable UUID id) {
		service.onEdit(adressLiv, id);
	}
}
