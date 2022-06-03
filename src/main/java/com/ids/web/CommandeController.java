package com.ids.web;

import java.util.List;
import java.util.UUID;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ids.data.web.AbstractCrudController;
import com.ids.entity.Commande;
import com.ids.repository.CommandeRepository;
import com.ids.service.CommandeService;

import lombok.AllArgsConstructor;

//http://localhost:1000/api/v1/Commandes
@RestController
@RequestMapping("/api/v1/commandes")
@CrossOrigin("*")
@AllArgsConstructor
public class CommandeController extends AbstractCrudController<Commande, UUID> {
	private CommandeRepository repository;
//	private CommandeService service;

	@GetMapping("/allcoms")
	public List<Commande> all() {
		return repository.findAsc();
	}

	@GetMapping("/season/{saison}")
	public List<Commande> BySeason(@PathVariable String saison) {
		return repository.findBySeason(saison);
	}

	@GetMapping("/idclient/{idClient}")
	public List<Commande> ByIdClient(@PathVariable UUID idClient) {
		return repository.findByIdClient(idClient);
	}

	/*@PostMapping("/post")
	public void onSave(@RequestBody Commande commande) {
		service.onSave(commande);
	}
	
	@PutMapping("/put/{id}")
	public void onEdit(@RequestBody Commande commande, @PathVariable UUID id) {
		service.onEdit(commande, id);
	}*/
}
