package com.ids.web;

import java.util.UUID;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ids.data.web.AbstractCrudController;
import com.ids.entity.Palette;
import com.ids.repository.PaletteRepository;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import lombok.AllArgsConstructor;


@RestController
@RequestMapping("/api/v1/palette")
@CrossOrigin("*")
@AllArgsConstructor
public class PaletteController extends AbstractCrudController<Palette,UUID> {
	
	private PaletteRepository pr;
	
	@GetMapping("client/{idClient}")
	public List<Palette> getByClient(@PathVariable UUID idClient){
		return pr.findByIdClient(idClient);
	}
	
	@GetMapping("/numPalette/{idClient}")
	public List getNumPallete(@PathVariable UUID idClient){
		List<Palette> all = pr.findByIdClient(idClient);
		List palette = new ArrayList();
		for(int i=0;i<all.size();i++) {
			palette.add(all.get(i).getNummero_Palette());
		}
		
		return palette;
	}

}
