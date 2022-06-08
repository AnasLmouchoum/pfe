package com.ids.entity;

import java.sql.Date;
import java.util.UUID;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

import org.hibernate.annotations.Where;

import com.ids.data.entity.AuditableEntityId;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@RequiredArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString(callSuper = true)
@Entity
@Where(clause = "deleted = false")
public class Product extends AuditableEntityId<UUID> {

	private static final long serialVersionUID = 1L;
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long num;
	private Double quantite;
	private Date dateProd;
	private Boolean commeFait;
	private String portion;

	private UUID idCommande;
	private UUID idClient;
	private UUID idArticle;
	private UUID idArticleCommande;

}