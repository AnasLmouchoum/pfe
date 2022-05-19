package com.ids.web;

import java.util.List;
import java.util.UUID;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.ids.data.web.AbstractCrudController;
import com.ids.entity.LigneDeCommande;
import com.ids.repository.LigneDeCommandeRepository;


import lombok.AllArgsConstructor;

//http://localhost:1000/api/v1/lignesDecommand
@RestController
@RequestMapping("/api/v1/lignesDecommand")
@CrossOrigin("*")
@AllArgsConstructor
public class LigneDeCommandeController extends AbstractCrudController<LigneDeCommande, UUID>{

	private LigneDeCommandeRepository repository;
	@GetMapping("/idcommandefournisseur/{idCommandeFournisseur}")
	public List<LigneDeCommande> findByIdCommandeFournisseur(@PathVariable UUID idCommandeFournisseur) {
		return repository.findByIdCommandeFournisseur(idCommandeFournisseur);
	}
	@GetMapping("/idmatierepremiere/{idMatierePremiere}")
	public List<LigneDeCommande> findByIdMatierePremiere(@PathVariable UUID idMatierePremiere) {
		return repository.findByIdMatierePremiere(idMatierePremiere);
	}

}
