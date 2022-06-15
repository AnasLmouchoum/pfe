package com.ids.entity;

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
@Where(clause = "deleted = false and archived = false")
public class Fournisseur extends EntityUuid {
	public static final long serialVersionUID = 1l;
	private String design;
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