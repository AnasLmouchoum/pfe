package com.ids.entity;

import java.io.Serializable;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

import org.hibernate.annotations.Immutable;
import org.hibernate.annotations.Subselect;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@Getter
@Setter
@RequiredArgsConstructor
@AllArgsConstructor
@ToString(callSuper = true)
@Entity
@Immutable
@IdClass(ProductDone.class)
@Table(name = "`product_done`")
@Subselect("select pd.* from product_done pd")
public class ProductDone implements Serializable {

	private static final long serialVersionUID = 1L;
	@Id
	@Column(insertable = false, updatable = false)
	private UUID idArticle;
	@Id
	@Column(insertable = false, updatable = false)
	private UUID idClient;
	@Column(insertable = false, updatable = false)
	private Double sum;
	@Id
	@Column(insertable = false, updatable = false)
	private UUID idCommande;
	@Id
	@Column(insertable = false, updatable = false)
	private String portion;
}
