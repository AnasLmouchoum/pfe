package com.ids.repository;

import java.util.List;
import java.util.UUID;

import com.ids.data.repository.BaseRepository;
import com.ids.entity.LigneDeCommande;

public interface LigneDeCommandeRepository extends BaseRepository<LigneDeCommande, UUID>{
	public List<LigneDeCommande> findByIdCommandeFournisseur(UUID idCommandeFournisseur);
	public List<LigneDeCommande> findByIdMatierePremiere(UUID idMatierePremiere);
}

