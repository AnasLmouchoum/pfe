package com.ids.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.Query;

import com.ids.data.repository.BaseRepository;
import com.ids.entity.Commande;

public interface CommandeRepository extends BaseRepository<Commande, UUID> {

	@Query("select c from Commande c order by c.season asc")
	public List<Commande> findAsc();

	public List<Commande> findBySeason(String season);

	public List<Commande> findByIdClient(UUID idClient);
}
