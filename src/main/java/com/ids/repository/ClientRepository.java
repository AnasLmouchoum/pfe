package com.ids.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.Query;

import com.ids.data.repository.BaseRepository;
import com.ids.entity.Client;

public interface ClientRepository extends BaseRepository<Client, UUID> {
	public List<Client> findByDesign(String design);

	@Query("select c from Client c order by c.design asc")
	public List<Client> findAsc();

	@Query("select c.id from Client c")
	public List<String> getids();
}
