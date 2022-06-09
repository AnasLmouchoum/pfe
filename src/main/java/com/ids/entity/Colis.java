package com.ids.entity;

import java.util.UUID;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;

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
public class Colis extends EntityUuid {

	private static final long serialVersionUID = 1L;
	private int codeArticle;
	private UUID idClient;
	private String designation;
	private int quantite;
	private int nCommande;
	private String saison;
	private String portion;
	private int nColisDe;
	private int nColisA;
	private UUID idArticle;
	private UUID idCommande;
	private UUID idColisage;

	private boolean inPalette;

	@ManyToOne
	private Palette palette;
}