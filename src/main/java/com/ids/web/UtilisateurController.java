package com.ids.web;

import java.util.List;
import java.util.UUID;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ids.data.web.AbstractCrudController;
import com.ids.entity.Colis;
import com.ids.entity.Utilisateur;
import com.ids.repository.ColisRepository;
import com.ids.repository.UtilisateurRepository;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/v1/users")
@CrossOrigin("*")
@AllArgsConstructor
public class UtilisateurController extends AbstractCrudController<Utilisateur,UUID>  {
	private UtilisateurRepository ur;
	
	@GetMapping("/{email}/{password}")
	public Utilisateur getUser(@PathVariable String email,@PathVariable String password) {
		System.out.println(email+"|"+password);
		List<Utilisateur> all = ur.findAll();
		for(int i=0;i<all.size();i++) {
			if(all.get(i).getEmail().equals(email) && all.get(i).getPassword().equals(password)) {
				return all.get(i);
			}
		}
		
		return null;
	}
	@DeleteMapping("/del/{id}")
	public void deleteUser(@PathVariable UUID id) {
		List<Utilisateur> all = ur.findAll();
		for(int i=0;i<all.size();i++) {
			if(all.get(i).getId() == id) {
				ur.delete(all.get(i));
				break;
			}
		}
	}
	@GetMapping("/byEmail/{email}")
	public Utilisateur UtilisateurByEmail(@PathVariable String email) {
		System.out.println(email);
		List<Utilisateur> allUser = ur.findAll();
		for(int i=0;i<allUser.size();i++) {
			if(allUser.get(i).getEmail().equals(email)) {
				return allUser.get(i);
			}
		}
		return null;
	}
	@GetMapping("/changePsd/{id}/{password}")
	public void changerPswd(@PathVariable UUID id,@PathVariable String password ) {
		List<Utilisateur> all = ur.findAll();
		System.out.println(id+"|"+password);
		for(int i=0;i<all.size();i++) {
			if(all.get(i).getId().equals(id)) {
				
				all.get(i).setPassword(password);
				ur.save(all.get(i));
			}
		}
	}

}
