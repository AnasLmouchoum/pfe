package com.ids.repository;

import java.util.List;
import java.util.UUID;

import com.ids.data.repository.BaseRepository;
import com.ids.entity.Product;

public interface ProductRepository extends BaseRepository<Product, UUID> {

	List<Product> findByIdArticle(UUID idArticle);

}
