package com.ids.entity;

import java.util.UUID;

import javax.persistence.Entity;

import org.hibernate.annotations.Where;

import com.ids.data.entity.EntityUuid;

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
@Where(clause = "deleted = false")
public class ArticleCommande extends EntityUuid {

	private static final long serialVersionUID = 1L;
	private String design;
	private long qte;
	private String portion;
	private double pu;
	private UUID idCommande;
	private UUID idArticlee;

}
