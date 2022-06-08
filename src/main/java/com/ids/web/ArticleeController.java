package com.ids.web;

import java.util.UUID;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ids.data.web.AbstractCrudController;
import com.ids.entity.Articlee;
import com.ids.repository.ArticleeRepository;
import com.ids.repository.MatiereArticleRepository;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/v1/articlees")
@CrossOrigin("*")
@AllArgsConstructor
public class ArticleeController extends AbstractCrudController<Articlee, UUID> {

	private MatiereArticleRepository matArtRep;

	private ArticleeRepository artRep;

	@PostMapping("/save")
	public void addMatiereArticle(@RequestBody Articlee art) {
		System.out.println(art);
		Articlee artCopy = artRep.save(art);
		art.getArticleMatieres().forEach(ArtMat -> {
			ArtMat.setArticle(artCopy);
			matArtRep.save(ArtMat);
		});
	}

	@PutMapping("/save")
	public void editMatiereArticle(@RequestBody Articlee art) {
		System.out.println(art);
		matArtRep.deleteByMatiereId(art.getId());
		Articlee artCopy = artRep.save(art);
		art.getArticleMatieres().forEach(ArtMat -> {
			ArtMat.setArticle(artCopy);
			matArtRep.save(ArtMat);
		});
	}

}
