package com.ids.entity;

import java.sql.Date;
import java.util.List;
import java.util.UUID;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.Where;

import com.ids.data.entity.AuditableEntityId;
import com.ids.data.entity.EntityUuid;
import com.ids.data.web.AbstractCrudController;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
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
	
	private boolean inPalette;
	
	@ManyToOne()
	private Palette palette;
}
