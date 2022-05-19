package com.ids.entity;

import javax.persistence.Entity;
import com.ids.data.entity.EntityUuid;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.RequiredArgsConstructor;
import lombok.experimental.SuperBuilder;
import lombok.AllArgsConstructor;

@SuperBuilder
@Setter
@Getter
@RequiredArgsConstructor
@AllArgsConstructor
@ToString(callSuper = true)
@Entity
public class Fournisseur extends EntityUuid{
public static final long serialVersionUID=1l;
	private String raisonSociale;
	private String contact;
	private String tel;
	private String email;
	private String adressse;
	private String modeDeReglements;
	private String incoterm;
	private String devise;
	private String coordonéésBancaire;
	private String nomBanque;
	private String ribBanque;
	private String swift;
	private String image;
}