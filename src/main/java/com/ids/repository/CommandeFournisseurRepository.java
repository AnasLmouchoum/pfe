package com.ids.repository;

import java.util.List;
import java.util.UUID;

import com.ids.data.repository.BaseRepository;
import com.ids.entity.CommandeFournisseur;
import com.ids.data.repository.BaseRepository;

public interface CommandeFournisseurRepository extends BaseRepository<CommandeFournisseur, UUID>{
	public List<CommandeFournisseur> findByIdFournisseur(UUID idFournisseur);
}
