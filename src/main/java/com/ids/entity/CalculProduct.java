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
@IdClass(CalculProduct.class)
@Table(name = "`calcul_product`")
@Subselect("select cp.* from calcul_product cp")
public class CalculProduct implements Serializable {

	private static final long serialVersionUID = 1L;
	@Id
	@Column(insertable = false, updatable = false)
	private UUID idArticlee;
	@Id
	@Column(insertable = false, updatable = false)
	private UUID idCommande;
	@Id
	@Column(insertable = false, updatable = false)
	private String portion;
	@Column(insertable = false, updatable = false)
	private Double qteTotal;
	@Column(insertable = false, updatable = false)
	private Double qteProduit;

}
