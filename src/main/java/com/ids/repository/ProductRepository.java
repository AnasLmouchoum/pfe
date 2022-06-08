package com.ids.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.Query;

import com.ids.data.repository.BaseRepository;
import com.ids.entity.Product;

public interface ProductRepository extends BaseRepository<Product, UUID> {
	
	public List<Product> findByIdClient(UUID idClient);

}
