package com.ids.repository;

import javax.transaction.Transactional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.ids.entity.CalculProduct;

@Repository
@Transactional
public interface CalculProductRepository extends CrudRepository<CalculProduct, Long> {

}
