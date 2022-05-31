package com.ids.web;

import java.util.List;
import java.util.UUID;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.ids.data.web.AbstractCrudController;
import com.ids.entity.Colisage;
import com.ids.repository.ColisageRepository;


import lombok.*;

@RestController
@RequestMapping("/api/v1/colisage")
@CrossOrigin("*")
@AllArgsConstructor
public class ColisageController extends AbstractCrudController<Colisage,UUID> {
	private ColisageRepository crep;
	
	@GetMapping("/allColisage")
	public List<Colisage> getAll(){
//		System.out.println(crep.findAll());
		return crep.findAll();
	}
	
	@PostMapping(value = "/newColisage")
	public void newColisage(@RequestBody Colisage cl) {
//		System.out.println(cl);
//		System.out.println("Hello world");
		crep.save(cl);
	}
	
	@DeleteMapping("/deleteColis/{id}")
	public void deleteColis(@PathVariable UUID id) {
		
		crep.deleteById(id);
	}
}
