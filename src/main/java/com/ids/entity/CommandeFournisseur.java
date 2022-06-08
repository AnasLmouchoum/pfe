package com.ids.entity;

import java.util.Date;
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
public class CommandeFournisseur extends EntityUuid {

	public static final long serialVersionUID = 1l;
	private Date dateLivraison;
	private Date dateCommande;
	private UUID idFournisseur;
}
