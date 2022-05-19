package com.ids.repository;

import java.util.List;
import java.util.UUID;

import com.ids.data.repository.BaseRepository;
import com.ids.entity.MatierePremiere;

public interface MatierePremiereRepository extends BaseRepository<MatierePremiere, UUID>{
	public List<MatierePremiere> findByIdFournisseur(UUID idFournisseur);

}
