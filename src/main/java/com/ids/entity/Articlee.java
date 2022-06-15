package com.ids.entity;

import java.sql.Date;
import java.util.List;
import java.util.UUID;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;

import org.hibernate.annotations.Where;

import com.ids.data.entity.AuditableEntityId;

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
@Where(clause = "deleted = false and archived = false")
public class Articlee extends AuditableEntityId<UUID> {

	private static final long serialVersionUID = 1L;
	private String codeArt;
	private String designation;
	private String prixUnit;
	private String poids;
	private String codeBarre;
	private Date date;

	private UUID idFamilleArticle;
	private UUID idFournisseur;
	private UUID idClient;

	@OneToMany(mappedBy = "article", fetch = FetchType.LAZY, orphanRemoval = true)
	private List<MatiereArticle> articleMatieres;
}
