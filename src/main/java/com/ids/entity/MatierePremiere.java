package com.ids.entity;

import java.util.UUID;

import javax.persistence.Entity;

import com.ids.data.entity.EntityUuid;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@Setter
@Getter
@RequiredArgsConstructor
@AllArgsConstructor
@ToString(callSuper = true)
@Entity
public class MatierePremiere extends EntityUuid {

	public static final long serialVersionUID = 1l;
	private String codeMat;
	private String designation;
	private String familleMatierePremiere;
	private Double prixUnit;
	private String unitMesure;
	private Long stock;
	private String origine;
	private UUID idFournisseur;

	//	@OneToMany
	//	private List<MatiereArticle> articleMatieres;
}
