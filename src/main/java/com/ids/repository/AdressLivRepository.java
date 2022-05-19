package com.ids.repository;

import java.util.List;
import java.util.UUID;

import com.ids.data.repository.BaseRepository;
import com.ids.entity.AdressLiv;

public interface AdressLivRepository extends BaseRepository<AdressLiv, UUID> {
	public List<AdressLiv> findByIdClient(UUID idClient);
}
