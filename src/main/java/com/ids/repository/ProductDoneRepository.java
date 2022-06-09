package com.ids.repository;

import javax.transaction.Transactional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.ids.entity.ProductDone;

@Repository
@Transactional
public interface ProductDoneRepository extends CrudRepository<ProductDone, Long> {

}
