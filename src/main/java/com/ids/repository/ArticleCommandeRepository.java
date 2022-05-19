package com.ids.repository;

import java.util.List;
import java.util.UUID;

import com.ids.data.repository.BaseRepository;
import com.ids.entity.ArticleCommande;

public interface ArticleCommandeRepository extends BaseRepository<ArticleCommande, UUID> {
	public List<ArticleCommande> findByIdCommande(UUID idCommande);
}
