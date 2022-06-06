package com.ids.web;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ids.data.web.AbstractCrudController;
import com.ids.entity.Colis;
import com.ids.repository.ColisRepository;


import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/v1/colis")
@CrossOrigin("*")
@AllArgsConstructor
public class ColisController extends AbstractCrudController<Colis,UUID> {
		
		private ColisRepository cr;
		
		@GetMapping("/byidClient/{idClient}")
		public List<Colis> getByIdClient(@PathVariable UUID idClient){
			List<Colis> allColis = cr.findAll();
			List<Colis> listR = new ArrayList<Colis>();
			for(int i=0;i<allColis.size();i++){
				if(allColis.get(i).getIdClient().equals(idClient)){
					listR.add(allColis.get(i));
					System.out.println(i+"is in");
				}
			}
			return listR;
		}
}
